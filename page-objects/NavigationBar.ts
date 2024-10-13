import { Page, Locator } from "@playwright/test";


export class Navigation {
    readonly page: Page
    readonly goToShopButton: Locator

    constructor(page: Page){
        this.page = page
        this.goToShopButton = page.getByText('Shop')
    }

    goToShop = async () => {
        await this.goToShopButton.click()
    }    
}