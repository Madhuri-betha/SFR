import { Page, expect } from "@playwright/test"
import { labels, addBUValues, limit } from "../Variables/AddBU-Variables"
import test from "@playwright/test"

var count: number = 0;

export const checkLables = async (page: Page) => {
    await page.locator(`//button[@id="Add Business Unit"]`).click()
    //labels name check
    const l1 = await page.locator(`//div[@id="Instance"]/label`).innerText()
    expect(l1).toBe(labels.instance)
    const l2 = await page.locator(`//div[@id="Business Unit Name"]/label`).innerText()
    expect(l2).toBe(labels.businessUnitName)
    const l3 = await page.locator(`//div[@id="Base Folder"]/label`).innerText()
    expect(l3).toBe(labels.baseFolder)
    const l4 = await page.locator(`//div[@id="ServiceNow Cost Center"]/label`).innerText()
    expect(l4).toBe(labels.serviceNowCostCenter)
    const l5 = await page.locator(`//div[@id="BU Owner Name"]/label`).innerText()
    expect(l5).toBe(labels.bUOwnerName)
    const l6 = await page.locator(`//div[@id="BU Owner Email"]/label`).innerText()
    expect(l6).toBe(labels.bUOwnerEmail)
    const l7 = await page.locator(`//div[@id="Secondary BU Owner Name"]/label`).innerText()
    expect(l7).toBe(labels.secondaryBUOwnerName)
    const l8 = await page.locator(`//div[@id="Secondary BU Owner Email"]/label`).innerText()
    expect(l8).toBe(labels.secondaryBUOwnerEmail)
}

export const saveFunctionalityCheck = async (page: Page) => {
    await page.locator(`//button[@id="Add Business Unit"]`).click()
    //entering Values
    await page.locator(`//div[@id="Business Unit Name"]/input`).fill(addBUValues.businessUnitName)
    await page.locator(`//button[@id="Check Availability"]`).click()
    await page.waitForTimeout(2000)
    if (await page.locator(`//span[text(),"Business Unit name ${addBUValues.businessUnitName} is available."]`)) {
        await page.locator(`//div[@id="Base Folder"]/input`).fill(addBUValues.baseFolder)
        await page.locator(`//div[@id="ServiceNow Cost Center"]/input`).fill(addBUValues.serviceNowCostCenter)
        await page.locator(`//div[@id="BU Owner Name"]/input`).fill(addBUValues.bUOwnerName)
        await page.locator(`//div[@id="BU Owner Email"]/input`).fill(addBUValues.bUOwnerEmail)
        await page.locator(`//div[@id="Secondary BU Owner Name"]/input`).fill(addBUValues.secondaryBUOwnerName)
        await page.locator(`//div[@id="Secondary BU Owner Email"]/input`).fill(addBUValues.secondaryBUOwnerEmail)
        await page.locator(`//button[@id="Save"]`).click()
    }
    // else {
    //     test.fail()
    // }
}

export const cancelButtonCheck = async (page: Page) => {
    await page.locator(`//button[@id="Add Business Unit"]`).click()
    //clicking cancel
    await page.locator(`//button[@id="Cancel"]`).click()
    const isPopupVisible = await page.isVisible(`//div[@id="Cancel popup"]`)
    console.log('Is Popup Visible:', isPopupVisible);
    await expect(isPopupVisible).toBe(true)
    await page.waitForTimeout(3000)
    await page.locator(`//button[@id="No"]`).click()
    const isPopupNotVisible = await page.isHidden(`//div[@id="Cancel popup"]`)
    await expect(isPopupNotVisible).toBe(true)
}

export const showMoreCheck = async (page: Page,limit:number) => {
    const totalRows = parseInt(await page.locator(`//div[@id="CountContainer"]/span[2]`).innerText())
    var i, j: number;
    for (i = 1; i < totalRows; i = i + limit) {
        let r=0
        for (j = i; j < (i + limit); j++){
            const iss = await page.isVisible(`//div[@id="TableContainer"]//tbody/tr[${j}]`)
            console.log(iss);
            
            if (iss) {
                r = r + 1
            }
            console.log(r);
            
        }
        count=count+r
        console.log(count);
        await page.locator(`//div[@id="TableContainer"]//button`).click()
    }
    
    // if (count != totalRows) {
    //     test.fail()
    // }

}

export const deleteCheck= async (page: Page) => {
    await page.locator(`//div[@id="TableContainer"]//tr[1]//span[@id="Delete"]`).click()
    const isPopupVisible = await page.isVisible(`//div[@id="delete bu  popup"]`)
    console.log('Is Popup Visible:', isPopupVisible);
    await expect(isPopupVisible).toBe(true)
    await page.waitForTimeout(3000)
    await page.locator(`//button[@id="Yes"]`).click()
    await page.waitForTimeout(3000)

}





