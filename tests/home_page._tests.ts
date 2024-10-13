import { test, expect } from '@playwright/test';
import { Navigation } from '../page-objects/NavigationBar';

test.beforeEach('Go to website', async ({page}) => {
  await page.goto('http://practice.automationtesting.in/');
  await page.locator('button:has-text("Consent")').nth(1).click()
})

test('Homepage has 3 sliders', async ({ page }) => {
  const navigation = new Navigation(page)
  await navigation.goToShop()
  await page.getByText('Shop').click()
  await page.getByText('Home').click()
  
  await expect(page.locator('.n2-ss-slider-1')).toBeVisible()
  await expect(page.locator('.n2-ss-slider-2')).toBeVisible()
  await expect(page.locator('.n2-ss-slider-3')).toBeVisible()
  
});
test('Homepage has 3 arrivals', async({page}) => {
  await page.getByText('Shop').click()
  await page.getByText('Home').click()
  const arrival = page.locator('.woocommerce-LoopProduct-link')
  await expect(arrival).toHaveCount(3)
})
test('Arrivals on homepage should navigate', async({page}) => {
  await page.getByText('Shop').click()
  await page.getByText('Home').click()
  const arrival = page.locator('.woocommerce-LoopProduct-link')
  await expect(arrival).toHaveCount(3)
  await arrival.nth(1).click()
  const addToBasketButton = page.getByRole('button', {name: 'Add to basket'})
  await expect(addToBasketButton).toBeVisible()
  await expect(page).toHaveURL(new RegExp('^https://practice.automationtesting.in/product/'))
})
test('Home page Arrivals has correct images description', async({page}) => {
  await page.getByText('Shop').click()
  await page.getByText('Home').click()
  const arrival = page.locator('.woocommerce-LoopProduct-link')
  await expect(arrival).toHaveCount(3)
  await arrival.nth(1).click()
  const addToBasketButton = page.getByRole('button', {name: 'Add to basket'})
  await expect(addToBasketButton).toBeVisible()
  await expect(page).toHaveURL(new RegExp('^https://practice.automationtesting.in/product/'))
  await page.locator('.description_tab').click()
  const productTitle = page.locator('.product_title').textContent()
  console.log(productTitle)
  const productDescription = await page.locator('.woocommerce-Tabs-panel').first().textContent()
  await expect(productDescription).toContain('This book provides you with an intermediate knowledge of HTML')
  // .locator('p')).toHaveText(`${productTitle}`)
})
test('Home page Arrivals-Images reviews', async ({page}) => {
  await page.getByText('Shop').click()
  await page.getByText('Home').click()
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