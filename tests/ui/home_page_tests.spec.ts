import { test, expect } from '@playwright/test';
import { ProductsPage } from '../../page-objects/ProductsPage';
import { SingleProductPage } from '../../page-objects/SingleProductPage';
import { Navigation } from '../../page-objects/NavigationBar';
import { HomePage } from '../../page-objects/HomePage';
import { BasketPage } from '../../page-objects/BasketPage';


test.beforeEach('Go to website', async ({page}) => {
  await page.goto('http://practice.automationtesting.in/');
  await page.locator('button:has-text("Consent")').nth(1).click()
  const navigation = new Navigation(page)
  const productsPage = new ProductsPage(page)
  
  await navigation.goToShop()
  await productsPage.gotoHomePage()
  
})

test.describe('Home Page testing', async () => {

test('Homepage has 3 sliders', async ({ page }) => {
  const homePage = new HomePage(page)
  await homePage.sildersCheck()

});
test('Homepage has 3 arrivals', async({page}) => {
  const homePage = new HomePage(page)
  await homePage.arrivalsCheck()
})
test('Arrivals on homepage should navigate', async({page}) => {
  const homePage = new HomePage(page)
  const singleProductPage = new SingleProductPage(page)
  await homePage.arrivalsCheck()
  await homePage.navigateToFirstArrival()
  await singleProductPage.verifyUserCanSeeAddToCartButton()
})
test('Home page Arrivals has correct images description', async({page}) => {
  const homePage = new HomePage(page)
  const singleProductPage = new SingleProductPage(page)
  await homePage.arrivalsCheck()
  await homePage.navigateToFirstArrival()
  await singleProductPage.verifyUserCanSeeAddToCartButton()
  await singleProductPage.getProductDescription()
})
test('Home page Arrivals-Images reviews', async ({page}) => {
  const homePage = new HomePage(page)
  const singleProductPage = new SingleProductPage(page)
  await homePage.arrivalsCheck()
  await homePage.navigateToFirstArrival()
  await singleProductPage.verifyUserCanSeeAddToCartButton()
  await singleProductPage.getProductDescription()
  await singleProductPage.getProductReview()
  })
test('Home page Arrivals - Add to basket', async ({page}) => {
  const singleProductPage = new SingleProductPage(page)
  const homePage = new HomePage(page)
  await homePage.navigateToFirstArrival()
  await singleProductPage.addItemToBasket(20)
  })
  test('Home Arrivals - Add to basket - items', async ({page}) => {
    const singleProductPage = new SingleProductPage(page)
    const homePage = new HomePage(page)
    await homePage.navigateToFirstArrival()
    await singleProductPage.addItemToBasket(20)
    await singleProductPage.goToCartButton()
  })
  test('Home Arrivals - Add to basket - items - coupon', async ({page}) => {
    const singleProductPage = new SingleProductPage(page)
    const homePage = new HomePage(page)
    const basketPage = new BasketPage(page)
    
    await homePage.navigateToFirstArrival()
    await singleProductPage.addItemToBasket(20)
    await singleProductPage.goToCartButton()
    await basketPage.addCoupon()
  })
  test('Home-Arrivals-Add to Basket-Items-Coupon value<450', async({page}) => {
    const singleProductPage = new SingleProductPage(page)
    const homePage = new HomePage(page)
    const basketPage = new BasketPage(page)
    await homePage.navigateToSecondArrival()
    await singleProductPage.addOnlyOneItemToBasket(1)
    await singleProductPage.goToCartButton()
    await basketPage.addValidCouponButItemPriceIsTooLow()
  })
  test('Home-Arrivals-Add to Basket-Items-Remove book', async({page}) => {
    const singleProductPage = new SingleProductPage(page)
    const homePage = new HomePage(page)
    const basketPage = new BasketPage(page)
    await homePage.navigateToSecondArrival()
    await singleProductPage.addOnlyOneItemToBasket(1)
    await singleProductPage.goToCartButton()
    await basketPage.removeItem()
  })
  test('Home-Arrivals-Add to Basket-Items-Add book', async ({page}) => {
    const singleProductPage = new SingleProductPage(page)
    const homePage = new HomePage(page)
    const basketPage = new BasketPage(page)
    await homePage.navigateToSecondArrival()
    await singleProductPage.addOnlyOneItemToBasket(1)
    await singleProductPage.goToCartButton()
    await basketPage.addItemQuantity()
  })
})