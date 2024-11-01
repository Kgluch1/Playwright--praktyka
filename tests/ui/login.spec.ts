import { test, expect } from '@playwright/test';
import { ProductsPage } from '../../page-objects/ProductsPage';
import { SingleProductPage } from '../../page-objects/SingleProductPage';
import { Navigation } from '../../page-objects/NavigationBar';

test.beforeEach('Go to website', async ({page}) => {
  await page.goto('http://practice.automationtesting.in/');
  await page.locator('button:has-text("Consent")').nth(1).click()
  const navigation = new Navigation(page)
  const productsPage = new ProductsPage(page)
})

test.describe('login tests', async() => {
    
test('login with valid username and password', async ({page}) => {
    
})    
})