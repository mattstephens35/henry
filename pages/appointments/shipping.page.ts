import { Page, Locator } from "@playwright/test";

export class ShippingPage {
    readonly page: Page;
    readonly shippingHeader: Locator;
    readonly addressLineOne: Locator;
    readonly addressLineTwo: Locator;
    readonly city: Locator;
    readonly state: Locator;
    readonly zip: Locator;
    readonly continue: Locator;

    readonly continueContactDetails: Locator;

    constructor(page: Page) {
        this.page = page;
        this.shippingHeader = page.getByRole('heading', { name: 'Shipping' })
        this.addressLineOne = page.getByTestId('addressLine1')
        this.addressLineTwo = page.getByTestId('addressLine2')
        this.city = page.getByTestId('city')
        this.state = page.locator("select[data-testid='state']");
        this.zip = page.getByTestId('zip')
        this.continue = page.getByTestId('shippingAddressContinue')
    }

    getShippingHeader(): Locator {
        return this.shippingHeader
    }

    getAddressLineOne(): Locator {
        return this.addressLineOne;
    }
    getAddressLineTwo(): Locator {
        return this.addressLineTwo;
    }
    getCity(): Locator {
        return this.city;
    }
    getState(): Locator {
        return this.state;
    }
    getZip(): Locator {
        return this.zip;
    }
    getContinue(): Locator {
        return this.continue;
    }

    async enterAddressLineOne(address: string) {
        await (this.getAddressLineOne()).fill(address);
    }
    async enterAddressLineTwo(address: string) {
        await (this.getAddressLineTwo()).fill(address);
    }
    async enterCity(city: string) {
        await (this.getCity()).fill(city);
    }
    async selectState(state: string) {
        await (this.getState()).selectOption(state);
    }
    async enterZip(zip: string) {
        await (this.getZip()).fill(zip);
    }

    async fillShippingDetails(shippingDetails: any) {
        await this.enterAddressLineOne(shippingDetails.addressLineOne);
        await this.enterAddressLineTwo(shippingDetails.addressLineTwo);
        await this.enterCity(shippingDetails.city);
        await this.enterZip(shippingDetails.zip);
    }
}
