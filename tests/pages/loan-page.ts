import {Locator, Page} from "@playwright/test";

export class LoanPage {
    readonly page: Page
    readonly textFullName: Locator
    readonly textCommunicationLang: Locator
    readonly buttonContinue: Locator
    readonly textSuccess: Locator
    readonly buttonOk: Locator

    constructor(page: Page) {
        this.page = page;
        this.textFullName = page.getByTestId('final-page-full-name');
        this.textCommunicationLang = page.getByTestId('final-page-communication-language');
        this.buttonContinue = page.getByTestId('final-page-continue-button');
        this.textSuccess = page.getByText('Success!')
        this.buttonOk = page.getByTestId('final-page-success-ok-button');
    }
}