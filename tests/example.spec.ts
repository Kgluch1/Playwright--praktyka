import { test, expect } from '@playwright/test';

test.beforeEach('Go to website', async ({page}) => {
  await page.goto('http://practice.automationtesting.in/');
  await page.locator('button:has-text("Consent")').nth(1).click()
})

test('Homepage has 3 sliders', async ({ page }) => {
  await page.getByText('Shop').click()
  await page.getByText('Home').click()

  // const slider = page.locator('.n2-ss-slider-')
  // await expect(slider).toHaveCount(3)
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
})