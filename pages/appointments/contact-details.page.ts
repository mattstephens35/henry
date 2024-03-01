import { Page, Locator } from "@playwright/test";

export class ContactDetailsPage {
    readonly page: Page;
    readonly legalFirstName: Locator;
    readonly legalLastName: Locator;
    readonly emailAddress: Locator;
    readonly verifyEmailAddress: Locator;
    readonly dateOfBirth: Locator;
    readonly phoneNumber: Locator;
    readonly sexAssignedAtBirth: Locator;
    readonly preferredPronouns: Locator;
    readonly agreeToTerms: Locator;
    readonly consentToMarketing: Locator;

    readonly continueContactDetails: Locator;

    constructor(page: Page) {
        this.page = page;
        this.legalFirstName = page.getByTestId('firstName');
        this.legalLastName = page.getByTestId('lastName')
        this.emailAddress = page.getByTestId('email')
        this.verifyEmailAddress = page.getByTestId('verifyEmail')
        this.dateOfBirth = page.getByTestId('dob')
        this.phoneNumber = page.getByTestId('phoneNumber')
        this.sexAssignedAtBirth = page.getByTestId('sex')
        this.preferredPronouns = page.getByTestId('preferredPronouns')
        this.agreeToTerms = page.getByTestId('tosConsent')
        this.consentToMarketing = page.getByTestId('marketingConsent')

        this.continueContactDetails = page.locator('div').filter({ hasText: /^Continue$/ });
    }

    getLegalFirstName(): Locator {
        return this.legalFirstName;
    }
    getLegalLastName(): Locator {
        return this.legalLastName;
    }
    getEmailAddress(): Locator {
        return this.emailAddress;
    }
    getVerifyEmailAddress(): Locator {
        return this.verifyEmailAddress;
    }
    getDateOfBirth(): Locator {
        return this.dateOfBirth;
    }
    getPhoneNumber(): Locator {
        return this.phoneNumber;
    }
    getSexAssignedAtBirth(): Locator {
        return this.sexAssignedAtBirth;
    }
    getPreferredPronouns(): Locator {
        return this.preferredPronouns;
    }
    getAgreeToTerms(): Locator {
        return this.agreeToTerms;
    }
    getConsentToMarketing(): Locator {
        return this.consentToMarketing;
    }
    getContinueContactDetails(): Locator {
        return this.continueContactDetails;
    }

    async enterLegalFirstName(firstName: string) {
        await (this.getLegalFirstName()).fill(firstName);
    }
    async enterLegalLastName(lastName: string) {
        await (this.getLegalLastName()).fill(lastName);
    }
    async enterEmailAddress(email: string) {
        await (this.getEmailAddress()).fill(email);
    }
    async enterVerifyEmailAddress(email: string) {
        await (this.getVerifyEmailAddress()).fill(email);
    }
    async enterDateOfBirth(dob: string) {
        await (this.getDateOfBirth()).fill(dob);
    }
    async enterPhoneNumber(phoneNumber: string) {
        await (this.getPhoneNumber()).fill(phoneNumber);
    }
    async selectSexAssignedAtBirth(sex: string) {
        await (this.getSexAssignedAtBirth()).selectOption(sex);
    }
    async selectPreferredPronouns(pronouns: string) {
        await (this.getPreferredPronouns()).selectOption(pronouns);
    }
    async selectAgreeToTerms() {
        await (this.getAgreeToTerms()).click();
    }
    async selectConsentToMarketing() {
        await (this.getConsentToMarketing()).click();
    }

    async fillContactDetails(formDetails: any) {
        await this.enterLegalFirstName(formDetails.legalFirstName);
        await this.enterLegalLastName(formDetails.legalLastName);
        await this.enterEmailAddress(formDetails.emailAddress);
        await this.enterVerifyEmailAddress(formDetails.verifyEmailAddress);
        await this.enterDateOfBirth(formDetails.dateOfBirth);
        await this.enterPhoneNumber(formDetails.phoneNumber);
        await this.selectSexAssignedAtBirth(formDetails.sexAssignedAtBirth);
        await this.selectPreferredPronouns(formDetails.preferredGenderPronoun);
        if (formDetails.agreeToTerms) {
            await this.selectAgreeToTerms();
        }
        if (formDetails.consentToMarketing) {
            await this.selectConsentToMarketing();
        }
    }
}
