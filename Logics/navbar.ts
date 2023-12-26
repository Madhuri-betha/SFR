import { Page } from "@playwright/test"
export const Navbar=async(page: Page,stTab,buTab) => {
    await page.locator(`//span[@id="${stTab}"]`).click()
}