import { Page, Locator } from "@playwright/test";

export class NextAvailableTimePage {
    readonly page: Page;
    readonly henryLogo: Locator;
    readonly appointmenDates: Locator;
    readonly appointmentTimes: Locator;

    constructor(page: Page) {
        this.page = page;
        this.henryLogo = page.getByRole('img', { name: 'Henry Logo' });
        this.appointmenDates = page.locator("h5[class*='MuiTypography-root']");
        this.appointmentTimes = page.locator("div[class='MuiBox-root css-0'] button[type=button]");
    }

    getHenryLogo(): Locator {
        return this.henryLogo;
    }

    getAppointmentDates(): Locator {
        return this.appointmenDates;
    }

    getAppointmentTimes(): Locator {
        return this.appointmentTimes;
    }
}
