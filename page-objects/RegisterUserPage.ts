import { Page, Locator, expect } from "@playwright/test"


export class RegisterUserPage {
    readonly page: Page
    readonly emailInput: Locator
    readonly passwordInput: Locator
    readonly registerButton: Locator
    readonly loginEmailInput: Locator
    readonly noEmailErrorMsg: Locator

    constructor (page: Page){
        this.page = page
        this.emailInput = page.locator('#reg_email')
        this.passwordInput = page.locator('#reg_password')
        this.registerButton = page.getByRole('button', { name: 'Register' })
        this.loginEmailInput = page.locator('.login').locator('#username')
        this.noEmailErrorMsg = page.locator('.woocommerce-error')
    }
    registerNewUser = async (email, password) => {
        await this.emailInput.fill(email)
        await this.passwordInput.type(password, {delay: 100})
        await this.registerButton.click()
    }

    registerNewUserWithInvalidEmail = async (email, password) => {
        await this.emailInput.fill(email)
        await this.passwordInput.type(password, {delay: 100})
        await this.registerButton.click({force: true})

        const validationMessage = await this.emailInput.evaluate((element) => {
        const input = element as HTMLInputElement
        return input.validationMessage
      })
      expect(validationMessage).toContain("Uwzględnij znak „@” w adresie e-mail.")
    }
    registerNewUserWithEmptyEmailField = async (email, password) => {
        await this.emailInput.fill(email)
        await this.passwordInput.type(password, {delay: 100})
        await this.registerButton.click()
        await expect(this.noEmailErrorMsg).toContainText('Please provide a valid email address.')
    }
    registerNewUserWithEmptyPasswordlField = async (email, password) => {
        await this.emailInput.fill(email)
        await this.passwordInput.type(password, {delay: 100})
        await this.registerButton.click()
        await expect(this.noEmailErrorMsg).toContainText('Please enter an account password.')
    }
}