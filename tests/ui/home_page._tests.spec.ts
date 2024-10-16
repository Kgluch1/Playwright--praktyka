import { test, expect } from '@playwright/test';
import { ProductsPage } from '../../page-objects/ProductsPage';
import { SingleProductPage } from '../../page-objects/SingleProductPage';
import { Navigation } from '../../page-objects/NavigationBar';


test.beforeEach('Go to website', async ({page}) => {
  await page.goto('http://practice.automationtesting.in/');
  await page.locator('button:has-text("Consent")').nth(1).click()
  const navigation = new Navigation(page)
  const productsPage = new ProductsPage(page)
  
  await navigation.goToShop()
  await productsPage.gotoHomePage()
  
})

test.describe('Home Page testing', () => {

test('Homepage has 3 sliders', async ({ page }) => {
  await expect(page.locator('.n2-ss-slider-1')).toBeVisible()
  await expect(page.locator('.n2-ss-slider-2')).toBeVisible()
  await expect(page.locator('.n2-ss-slider-3')).toBeVisible()
  
});
test('Homepage has 3 arrivals', async({page}) => {
  const arrival = page.locator('.woocommerce-LoopProduct-link')
  await expect(arrival).toHaveCount(3)
})
test('Arrivals on homepage should navigate', async({page}) => {
  const arrival = page.locator('.woocommerce-LoopProduct-link')
  await expect(arrival).toHaveCount(3)
  await arrival.nth(1).click()
  const addToBasketButton = page.getByRole('button', {name: 'Add to basket'})
  await expect(addToBasketButton).toBeVisible()
  await expect(page).toHaveURL(new RegExp('^https://practice.automationtesting.in/product/'))
})
test('Home page Arrivals has correct images description', async({page}) => {
  const arrival = page.locator('.woocommerce-LoopProduct-link')
  await expect(arrival).toHaveCount(3)
  await arrival.nth(1).click()
  const addToBasketButton = page.getByRole('button', {name: 'Add to basket'})
  await expect(addToBasketButton).toBeVisible()
  await expect(page).toHaveURL(new RegExp('^https://practice.automationtesting.in/product/'))
  await page.locator('.description_tab').click()
  const productTitle = page.locator('.product_title').textContent()
  const productDescription = await page.locator('.woocommerce-Tabs-panel').first().textContent()
  await expect(productDescription).toContain('This book provides you with an intermediate knowledge of HTML')
  // .locator('p')).toHaveText(`${productTitle}`)
})
  test('Home page Arrivals-Images reviews', async ({page}) => {
  const arrival = page.locator('.woocommerce-LoopProduct-link')
  await expect(arrival).toHaveCount(3)
  await arrival.nth(1).click()
  const addToBasketButton = page.getByRole('button', {name: 'Add to basket'})
  await expect(addToBasketButton).toBeVisible()
  await expect(page).toHaveURL(new RegExp('^https://practice.automationtesting.in/product/'))
  const reviewsButton = await page.locator('.reviews_tab')
  await expect(reviewsButton).toBeVisible()
  const reviewTitleText = page.locator('#reply-title').textContent()
  await expect(reviewTitleText).toContain('HTML')
  })
  test('Home page Arrivals - Add to basker', async ({page}) => {
  const singleProductPage = new SingleProductPage(page)
  const arrival = page.locator('.woocommerce-LoopProduct-link')
  const basketCounter = page.locator('.wpmenucartli').locator('.amount')
  await expect(arrival).toHaveCount(3)
  await arrival.nth(1).click()
  await singleProductPage.addItemToBasket(20)
  })
  
})