import { Page, Locator, expect } from "@playwright/test"

export class BasketPage {
    readonly page: Page
    readonly couponCodeInput: Locator
    readonly addCouponButton: Locator
    readonly couponAddedMsg: Locator
    readonly priceBeforeCoupon: Locator
    readonly totalPrice: Locator
    readonly couponAddedError: Locator
    readonly removeItemButton: Locator
    readonly emptyCartMsg: Locator
    readonly returnToShopButton: Locator
    readonly updateBasketButton: Locator
    readonly itemQuantityCounter: Locator

    constructor(page: Page){
        this.page = page
        this.couponCodeInput = page.locator('#coupon_code')
        this.addCouponButton = page.getByRole('button', {name: 'Apply Coupon'})
        this.couponAddedMsg = page.locator('.woocommerce-message')
        this.couponAddedError = page.locator('.woocommerce-error')
        this.priceBeforeCoupon = page.locator('.cart-subtotal').locator('.woocommerce-Price-amount')
        this.totalPrice = page.locator('.order-total').locator('.woocommerce-Price-amount ')
        this.removeItemButton = page.locator('.remove')
        this.emptyCartMsg = page.locator('.cart-empty')
        this.returnToShopButton = page.locator('.return-to-shop')
        this.updateBasketButton = page.getByRole('button', {name: 'Update Basket'})
        this.itemQuantityCounter = page.locator('.quantity').locator('.input-text')

    }
    addCoupon = async() => {
        const couponCode = 'krishnasakinala'
        await this.couponCodeInput.fill(couponCode)
        await this.addCouponButton.click()
        await expect(this.couponAddedMsg).toContainText('Coupon code applied successfully.')
        const discountValueText = await this.priceBeforeCoupon.innerText() 
        const discountValueTextString = discountValueText.replace('₹', "")
        const discountValueNumber = parseFloat(discountValueTextString.replace(/"|\,|\./g, ''))/100
        // const discountValueNumber = parseInt(discountValueTextString)
        const totalValueText = await this.totalPrice.innerText()
        const totalValueTextString = totalValueText.replace('₹', "")
        const totalValueNumber = parseFloat(totalValueTextString.replace(/"|\,|\./g, ''))/100
        // const totalValueNumber = parseInt(totalValueTextString)
        // console.log(discountValueNumber, totalValueNumber)
        await expect(totalValueNumber).toBeGreaterThan(discountValueNumber)
    }
    addValidCouponButItemPriceIsTooLow = async() => {
        const couponCode = 'krishnasakinala'
        await this.couponCodeInput.fill(couponCode)
        await this.addCouponButton.click()
        await expect(this.couponAddedError).toContainText('The minimum spend for this coupon is')
        const discountValueText = await this.priceBeforeCoupon.innerText() 
        const discountValueTextString = discountValueText.replace('₹', "")
        const discountValueNumber = parseFloat(discountValueTextString.replace(/"|\,|\./g, ''))/100
        const totalValueText = await this.totalPrice.innerText()
        const totalValueTextString = totalValueText.replace('₹', "")
        const totalValueNumber = parseFloat(totalValueTextString.replace(/"|\,|\./g, ''))/100
        await expect(totalValueNumber).toBeGreaterThanOrEqual(discountValueNumber)
    }
    removeItem = async() => {
        await this.removeItemButton.click()
        await expect(this.emptyCartMsg).toContainText('Your basket is currently empty.')
        await expect(this.returnToShopButton).toBeVisible()
    }
    addItemQuantity = async() => {
        await expect(this.updateBasketButton).toBeDisabled()
        await expect(this.itemQuantityCounter).toHaveValue('1')
        await this.itemQuantityCounter.clear()
        await this.itemQuantityCounter.fill('2')
        await expect(this.updateBasketButton).not.toBeDisabled()
        await this.updateBasketButton.click()
        await expect(this.itemQuantityCounter).toHaveValue('2')


    }
}