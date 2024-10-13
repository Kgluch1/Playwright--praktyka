import { Page, Locator } from "@playwright/test";

export class ProductsPage {
    readonly page: Page
    readonly goHomePageButton: Locator    

    constructor(page: Page){
        this.page = page
        this.goHomePageButton = page.getByText('Home')
    }
    gotoHomePage = async () => {
        await this.goHomePageButton.click()
    }
}