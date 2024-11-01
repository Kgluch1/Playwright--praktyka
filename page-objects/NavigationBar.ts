import { Page, Locator } from "@playwright/test";


export class Navigation {
    readonly page: Page
    readonly goToShopButton: Locator
    readonly goToMyAccountButton: Locator

    constructor(page: Page){
        this.page = page
        this.goToShopButton = page.getByText('Shop')
        this.goToMyAccountButton = page.getByText('My Account')
    }

    goToShop = async () => {
        await this.goToShopButton.click()
    }
    goToMyAccount = async () => {
        await this.goToMyAccountButton.click()
    }    
}