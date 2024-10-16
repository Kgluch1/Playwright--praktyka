import { test, expect} from '@playwright/test'

test.beforeEach(async ({page}) => {
       await page.route('*/**/api/tags', async route => {
        const tags = {
    "tags": [
        "auto",
        "playwright"
    ]
}
        await route.fulfill({
            body: JSON.stringify(tags)
        })
    })
    

    await page.goto('https://conduit.bondaracademy.com/', {waitUntil: 'networkidle'})
    
})

test('has title', async({page}) => {
    await page.route('*/**/api/articles*', async route => {
        const response = await route.fetch()
        const responseBody = await response.json()
        responseBody.articles[0].title = 'To jest testowy tytuł'
        responseBody.articles[0].description = 'To jest testowy opis'
        await route.fulfill({
            body: JSON.stringify(responseBody)
        })
    })
    await page.getByText('Global Feed').click()
    await expect(page.locator('.navbar-brand')).toHaveText('conduit')
    await expect(page.locator('app-article-list h1').first()).toContainText('To jest testowy tytuł')
    await expect(page.locator('app-article-list p').first()).toContainText('To jest testowy opis')
   
})