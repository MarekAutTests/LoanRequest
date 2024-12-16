import {LoginPage} from "./pages/login-page";
import {expect, Locator, test} from "@playwright/test";
import {LoanPage} from "./pages/loan-page";

let loginPage: LoginPage

test.beforeEach(async ({page}) => {
    loginPage = new LoginPage(page)
    await loginPage.openLoanPage()
})

test('all elements visible on page', async ({page}) => {
    await expect.soft(loginPage.inputAmount).toBeVisible()
    await expect.soft(loginPage.dropdownPeriod).toBeVisible()
    await expect.soft(loginPage.scrollAmount).toBeInViewport()
    await expect.soft(loginPage.scrollPeriod).toBeInViewport()
    await expect.soft(loginPage.textMonthlyPeriodCalc).toBeVisible()
    await expect.soft(loginPage.buttonApplyNow).toBeVisible()
});

test('modify slider value and verify monthly payment changed', async ({page}) => {

    const initialAmount = await loginPage.textMonthlyPeriodCalc.textContent()
    console.log('>>> initial value: ', initialAmount)

    // change slider
    await loginPage.scrollPeriod.fill('20');

    // Loop until the textContent changes
    let updatedValue = initialAmount;
    let counter = 0
    while (updatedValue === initialAmount || counter <= 10) {
        console.log('checking ...');
        await page.waitForTimeout(500); // Wait before checking again
        updatedValue = await loginPage.textMonthlyPeriodCalc.textContent();
        counter++
        if (counter >= 10) {
            test.fail
        }
    }

    console.log('>>> updated value: ', await loginPage.textMonthlyPeriodCalc.textContent())
})

test('e2e Login scenario', async ({page}) => {
    await loginPage.buttonApplyNow.click()
    await loginPage.inputUserName.fill('test')
    await loginPage.inputPassword.fill('123123Qq')
    await loginPage.buttonContinue.click()
    const loanPage = new LoanPage(page)
    await expect.soft(loanPage.textFullName).toBeVisible()
    await expect.soft(loanPage.textCommunicationLang).toBeVisible()
    await expect.soft(loanPage.buttonContinue).toBeVisible()
    await loanPage.buttonContinue.click()
    await expect.soft(loanPage.textSuccess).toBeVisible()
    await expect.soft(loanPage.buttonOk).toBeVisible()
})