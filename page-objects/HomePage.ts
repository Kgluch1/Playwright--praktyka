import { expect, Locator, Page } from "@playwright/test";


export class HomePage {
    readonly page: Page
    readonly goToShopButton: Locator
    readonly sliderOne: Locator
    readonly sliderTwo: Locator
    readonly sliderThree: Locator
    readonly sliderFour: Locator
    readonly arrivals: Locator

    constructor(page: Page){
        this.sliderOne = page.locator('.n2-ss-slider-1')
        this.sliderTwo = page.locator('.n2-ss-slider-2')
        this.sliderThree = page.locator('.n2-ss-slider-3')
        this.sliderFour = page.locator('.n2-ss-slider-4')
        this.arrivals = page.locator('.woocommerce-LoopProduct-link')
        
    }
    sildersCheck = async () => {
       await expect(this.sliderOne).toBeVisible()
       await expect(this.sliderTwo).toBeVisible()
       await expect(this.sliderThree).toBeVisible()
       await expect(this.sliderFour).not.toBeVisible()
    }
    arrivalsCheck = async () => {
        await expect(this.arrivals).toHaveCount(3)
    }
    navigateToFirstArrival = async () => {
        await this.arrivals.first().click()
    }
    navigateToSecondArrival = async () => {
        await this.arrivals.nth(1).click()
    }

}