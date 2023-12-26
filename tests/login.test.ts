import { chromium, expect, test, } from '@playwright/test';
import { Login } from '../Logics/login.ts'
import { Navbar } from '../Logics/navbar.ts';
import { cancelButtonCheck, checkLables, saveFunctionalityCheck,deleteCheck,showMoreCheck } from '../Logics/AddBU.ts';

let browser;
let context;
let page; 

test.beforeEach("login and navigate to businness units",async () => {
  browser = await chromium.launch();
  context = await browser.newContext();
  page = await context.newPage();
  await Login(page)
  await Navbar(page, "ST Administration", "Business Units")
});

test("login to app and check lables", async () => {
  await checkLables(page)
})

test("save functionality", async () => {
  await saveFunctionalityCheck(page)
  await page.waitForTimeout(1000)
})

test("Cancel Functionality", async () => {
  await cancelButtonCheck(page)
})


test("show more Functionality", async () => {  
  test.setTimeout(120000)
  await page.waitForSelector('//div[@id="TableContainer"]//tbody/tr');
  const rowsCount = await page.locator(`//div[@id="TableContainer"]//tbody/tr`).count()
  console.log(rowsCount);
  const isButton = await page.isVisible(`//div[@id="TableContainer"]//button`)
  if (rowsCount < 9) {
    expect(isButton).toBe(false)
  }
  else {
    expect(isButton).toBe(true)
    await showMoreCheck(page,rowsCount)
  }
}) 

test("delete", async() => {
  await deleteCheck(page)
  
})