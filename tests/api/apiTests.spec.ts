import { test, expect} from '@playwright/test'

// Mock API
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

// Modify API
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
// Perform API request
test('delete article', async ({page, request}) => {
    
    
    const articleResponse = await request.post('https://conduit-api.bondaracademy.com/api/articles/', {
        data:{
            "article":{"title":"Witam","description":"teścik","body":"testt xD","tagList":[]}
        },
    })
    await expect(articleResponse.status()).toEqual(201)

    await page.getByText('Global Feed').click()
    await page.getByText('Witam').click()
    await page.getByRole('button', {name: 'Delete Article'}).first().click()
    await expect(page.locator('app-article-list h1').first()).not.toContainText('Witam')
})

test('create article', async ({page, request}) => {
    await page.getByText('New Article').click()
    await page.getByRole('textbox', {name: 'Article Title'}).fill('Playwright xDD')
    await page.getByRole('textbox', {name: 'What\'s this article about?'}).fill('xD')
    await page.getByRole('textbox', {name: 'Write your article (in markdown)'}).fill('xDDDDDDDDDDDDDDDDDD')
    await page.getByRole('button', {name: 'Publish Article'}).click()

    const articleResponse = await page.waitForResponse('https://conduit-api.bondaracademy.com/api/articles/')
    const articleResponseBody = await articleResponse.json()
    console.log(articleResponseBody)
    const slugId = articleResponseBody.article.slug

    await expect(page.locator('.article-page h1')).toContainText('Playwright xDD')
    await page.getByText('Home').click()
    await page.getByText('Global Feed').click()
    await expect(page.locator('app-article-list h1').first()).toContainText('Playwright xDD')

    const deleteArticleResponse = await request.delete(`https://conduit-api.bondaracademy.com/api/articles/${slugId}`)
    await expect(deleteArticleResponse.status()).toEqual(204)
})