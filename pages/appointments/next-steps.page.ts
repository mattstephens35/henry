import { Page, Locator } from "@playwright/test";

export class NextStepsPage {
    readonly page: Page;
    readonly nextSteps: Locator;
    readonly appointmentContinue: Locator;

    constructor(page: Page) {
        this.page = page;
        this.nextSteps = page.getByRole('heading', { name: 'Next Steps' })
        this.appointmentContinue = page.getByTestId('appointmentOverviewContinue')
    }

    getNextSteps(): Locator {
        return this.nextSteps;
    }

    getAppointmentContinue(): Locator {
        return this.appointmentContinue;
    }
}
