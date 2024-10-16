import { Page, Locator, expect } from "@playwright/test"

export class SingleProductPage {

    readonly page: Page
    readonly basketMoneyCounter: Locator
    readonly addToBasketButton: Locator
    readonly itemQuantityInput: Locator

    constructor(page: Page){
        this.page = page
        this.basketMoneyCounter = page.locator('.wpmenucartli').locator('.amount')
        this.addToBasketButton = page.getByRole('button', { name: 'Add to basket' })
        this.itemQuantityInput = page.locator('.input-text')
    }
    addItemToBasket = async (index: number) => {
        const addToBasketButton = this.addToBasketButton
        const basketMoneyCounter = this.basketMoneyCounter
        const itemQuantityInput = this.itemQuantityInput
        await expect(addToBasketButton).toBeVisible()
        await itemQuantityInput.clear()
        await expect(basketMoneyCounter).toHaveText('₹0.00')
        await itemQuantityInput.fill(`${index}`)
        await addToBasketButton.click()
        await expect(basketMoneyCounter).toHaveText('₹8,000.00')
    }
}