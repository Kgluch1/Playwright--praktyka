import { Page, Locator, expect } from "@playwright/test"

export class SingleProductPage {

    readonly page: Page
    readonly basketMoneyCounter: Locator
    readonly addToBasketButton: Locator
    readonly itemQuantityInput: Locator
    readonly productDescription: Locator
    readonly productReviewButton: Locator
    readonly productReviewText: Locator

    constructor(page: Page){
        this.page = page
        this.basketMoneyCounter = page.locator('.wpmenucartli').locator('.amount')
        this.addToBasketButton = page.getByRole('button', { name: 'Add to basket' })
        this.itemQuantityInput = page.locator('.input-text')
        this.productDescription =  page.locator('#tab-description')
        this.productReviewButton = page.locator('.reviews_tab')
        this.productReviewText = page.locator('.woocommerce-noreviews')
    }
    addItemToBasket = async (index: number) => {
        const arrival = this.page.locator('.woocommerce-LoopProduct-link')
        // await expect(arrival).toHaveCount(3)
        // await arrival.nth(1).click()
        await expect(this.addToBasketButton).toBeVisible()
        await this.itemQuantityInput.clear()
        await expect(this.basketMoneyCounter).toHaveText('₹0.00')
        await this.itemQuantityInput.fill(`${index}`)
        await this.addToBasketButton.click()
        await expect(this.basketMoneyCounter).toHaveText('₹10,000.00')
    }
    addOnlyOneItemToBasket = async(index: number) => {
        const arrival = this.page.locator('.woocommerce-LoopProduct-link')
        await expect(this.addToBasketButton).toBeVisible()
        await this.itemQuantityInput.clear()
        await expect(this.basketMoneyCounter).toHaveText('₹0.00')
        await this.itemQuantityInput.fill(`${index}`)
        await this.addToBasketButton.click()
        await expect(this.basketMoneyCounter).toHaveText('₹400.00')
    }
    verifyUserCanSeeAddToCartButton = async () => {
        await expect(this.addToBasketButton).toBeVisible()
        await expect(this.page).toHaveURL(new RegExp('^https://practice.automationtesting.in/product/'))
    }
    getProductDescription = async () =>{
        // await productDescription.click()
        // const productDescription = await page.locator('.woocommerce-Tabs-panel').first().textContent()
        await expect(this.productDescription).toContainText('Selenium')
    }
    getProductReview = async () => {
        await this.productReviewButton.click()
        await expect(this.productReviewButton).toBeVisible()
        await expect(this.productReviewText).toContainText('There are no reviews yet.')
    }
    goToCartButton = async () => {
        await this.basketMoneyCounter.click()
    }
}