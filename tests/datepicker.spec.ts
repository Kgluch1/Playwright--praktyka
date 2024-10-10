import {test, expect} from '@playwright/test'

test('Home Page', async ({page}) => {
    await page.goto('https://testautomationpractice.blogspot.com/')
})