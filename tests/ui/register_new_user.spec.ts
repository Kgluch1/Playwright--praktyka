import { test, expect } from '@playwright/test';
import { ProductsPage } from '../../page-objects/ProductsPage';
import { SingleProductPage } from '../../page-objects/SingleProductPage';
import { Navigation } from '../../page-objects/NavigationBar';
import { RegisterUserPage } from '../../page-objects/registerUserPage';

function getRandomEmail(domain,length)
{
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < length; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text + domain;
}
const newInvalidUser = {
      email: getRandomEmail('xDD', 15),
      password: 'nsdmfns231sdsa@'
    }

test.beforeEach('Go to website', async ({page}) => {
  await page.goto('http://practice.automationtesting.in/');
  await page.locator('button:has-text("Consent")').nth(1).click()
  const navigation = new Navigation(page)
  const productsPage = new ProductsPage(page)
})

test.describe('register tests', async() => {
    
test('registration - sign in', async ({page}) => {
    const newUser = {
      email: getRandomEmail('@test.com', 15),
      password: 'nsdmfns231sdsa@'
    }
    const navigation = new Navigation(page)
    const registerUserPage = new RegisterUserPage(page)
    await navigation.goToMyAccount()
    await registerUserPage.registerNewUser(newUser.email, newUser.password)
})

test('registration with invalid email', async({page}) => {
  const newInvalidUser = {
      email: getRandomEmail('xDD', 15),
      password: 'nsdmfns231sdsa@'
    }
    const navigation = new Navigation(page)
    const registerUserPage = new RegisterUserPage(page)
    await navigation.goToMyAccount()
    await registerUserPage.registerNewUserWithInvalidEmail(newInvalidUser.email, newInvalidUser.password) 
})
test('registration with empty email', async({page}) => {
    const navigation = new Navigation(page)
    const registerUserPage = new RegisterUserPage(page)
    await navigation.goToMyAccount()
    await registerUserPage.registerNewUserWithEmptyEmailField("", newInvalidUser.password) 
  })

  test('registration with empty password', async({page}) => {
    const navigation = new Navigation(page)
    const registerUserPage = new RegisterUserPage(page)
    await navigation.goToMyAccount()
    await registerUserPage.registerNewUserWithEmptyPasswordlField(newInvalidUser.email, "") 
  })
  test('registration with empty email and password', async({page}) => {
    const navigation = new Navigation(page)
    const registerUserPage = new RegisterUserPage(page)
    await navigation.goToMyAccount()
    await registerUserPage.registerNewUserWithEmptyEmailField("", "") 
  })
})