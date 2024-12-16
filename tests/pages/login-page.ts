import {Locator, Page} from "@playwright/test";

export class LoginPage {
    readonly url = 'https://loan-app.tallinn-learning.ee/small-loan'
    readonly page: Page
    readonly inputAmount: Locator
    readonly dropdownPeriod: Locator
    readonly scrollAmount: Locator
    readonly scrollPeriod: Locator
    readonly textMonthlyPeriodCalc: Locator
    readonly buttonApplyNow: Locator
    readonly inputUserName: Locator
    readonly inputPassword: Locator
    readonly buttonContinue: Locator
    readonly buttonCloseLoginWindow: Locator

    constructor(page: Page) {
        this.page = page;
        this.inputAmount = page.getByTestId('id-small-loan-calculator-field-amount');
        this.dropdownPeriod = page.getByTestId('ib-small-loan-calculator-field-period')
        this.scrollAmount = page.getByTestId('id-small-loan-calculator-field-amount-slider');
        this.scrollPeriod = page.getByTestId('ib-small-loan-calculator-field-period-slider');
        this.textMonthlyPeriodCalc = page.getByTestId('ib-small-loan-calculator-field-monthlyPayment');
        this.buttonApplyNow = page.getByTestId('id-small-loan-calculator-field-apply');
        this.inputUserName = page.getByTestId('login-popup-username-input');
        this.inputPassword = page.getByTestId('login-popup-password-input');
        this.buttonContinue = page.getByTestId('login-popup-continue-button');
        this.buttonCloseLoginWindow = page.getByTestId('login-popup-close-button');
    }

    async openLoanPage(){
        await this.page.goto(this.url)
    }

}
