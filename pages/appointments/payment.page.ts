import { Page, Locator } from "@playwright/test";

export class PaymentPage {
    readonly page: Page;
    readonly paymentHeader: Locator;

    readonly continueContactDetails: Locator;

    constructor(page: Page) {
        this.page = page;
        this.paymentHeader = page.getByRole('heading', { name: 'Payment Method' })
    }

    getPaymentHeader(): Locator {
        return this.paymentHeader
    }
}
