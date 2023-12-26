import { Page } from '@playwright/test';
import { loginCredentials,app} from '../Variables/intialization';

export const Login = async (page: Page) => {
    await page.goto(app.APP_URL)
    await page.locator(`//div[@id="Work Email"]//input`).fill(loginCredentials.email)
    await page.locator(`//div[@id="Password"]//input`).fill(loginCredentials.password)
    await page.locator(`//button[@id="Login"]`).click()
    // await page.waitForTimeout(5000);
}