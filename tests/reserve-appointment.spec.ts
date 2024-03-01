import { test, expect, type Page, request, APIRequestContext } from '@playwright/test';
import { NextAvailableTimePage } from '../pages/appointments/next-available-time.page';
import { NextStepsPage } from '../pages/appointments/next-steps.page';
import { ContactDetailsPage } from '../pages/appointments/contact-details.page';
import { ShippingPage } from '../pages/appointments/shipping.page';
import { PaymentPage } from '../pages/appointments/payment.page';

const state = 'georgia'

test.beforeEach(async ({ page }) => {
  await page.goto(`/?state=${state}`);
});

test.describe('Reserve an appointment and add contact details', () => {
  test('should display Next Available Time page @appointment', async ({ page }) => {
    const nextAvailableTimePage = new NextAvailableTimePage(page);
    await expect(nextAvailableTimePage.getHenryLogo()).toBeVisible();
  });

  test('should display Next Steps page @appointment', async ({ page }) => {
    const nextAvailableTimePage = new NextAvailableTimePage(page);

    await nextAvailableTimePage.getAppointmentTimes().first().click();

    const nextStepsPage = new NextStepsPage(page);
    await expect(nextStepsPage.getNextSteps()).toBeVisible();
    await expect(nextStepsPage.getAppointmentContinue()).toBeVisible();
  });

  const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  const dayOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  test('should display Contact Details page @appointment @smoke', async ({ page, request }) => {
    const nextAvailableTimePage = new NextAvailableTimePage(page);

    const response = getApiAppointmentTimes(request);

    const results = (await response).json();
    const expectedFirstTime = ((await results).data.cappedAvailableTimes[0].startTime);
    const actualFirstDate = await nextAvailableTimePage.getAppointmentDates().first().textContent();
    const actualFirstTime = await nextAvailableTimePage.getAppointmentTimes().first().textContent();
    const actualAppointments = `${actualFirstDate} ${actualFirstTime}`.split(" ");
    const date = new Date(expectedFirstTime);
    // Check month
    expect(month[date.getUTCMonth()]).toBe(actualAppointments[2])
    // Check Day
    expect(dayOfWeek[date.getUTCDay()]).toBe(actualAppointments[0])
    // Check Time
    expect(`${date.getHours().toString().padStart(2, '0')}:${(date.getMinutes() < 10 ? '0' : '') + date.getMinutes()}`).toBe(actualAppointments[4])


    await nextAvailableTimePage.getAppointmentTimes().first().click();

    const nextStepsPage = new NextStepsPage(page);
    await nextStepsPage.getAppointmentContinue().click();

    const contactDetailsPage = new ContactDetailsPage(page);

    await expect(contactDetailsPage.getLegalFirstName()).toBeVisible();
  });

  test('should submit Contact Details @appointment', async ({ page }) => {
    const contactDetails = {
      legalFirstName: 'First',
      legalLastName: 'Last',
      emailAddress: 'mattstephens35@gmail.com',
      verifyEmailAddress: 'mattstephens35@gmail.com',
      dateOfBirth: '01/01/1990',
      phoneNumber: '555-555-5555',
      sexAssignedAtBirth: 'Female',
      preferredGenderPronoun: 'She/Her',
      agreeToTerms: true,
      consentToMarketing: true,
    }
    const nextAvailableTimePage = new NextAvailableTimePage(page);
    await nextAvailableTimePage.getAppointmentTimes().first().click();

    const nextStepsPage = new NextStepsPage(page);
    await nextStepsPage.getAppointmentContinue().click();

    const contactDetailsPage = new ContactDetailsPage(page);

  
    await contactDetailsPage.fillContactDetails(contactDetails);
    await contactDetailsPage.getContinueContactDetails().click();

    const shippingPage = new ShippingPage(page);
    await expect(shippingPage.getShippingHeader()).toBeVisible();
  });

  test('should submit Shipping Details @appointment @smoke', async ({ page }) => {
    const contactDetails = {
      legalFirstName: 'First',
      legalLastName: 'Last',
      emailAddress: 'mattstephens35@gmail.com',
      verifyEmailAddress: 'mattstephens35@gmail.com',
      dateOfBirth: '01/01/1990',
      phoneNumber: '555-555-5555',
      sexAssignedAtBirth: 'Female',
      preferredGenderPronoun: 'She/Her',
      agreeToTerms: true,
      consentToMarketing: true,
    }

    const shippingDetails = {
      addressLineOne: '123 Elm',
      addressLineTwo: 'Apt 205',
      city: 'Atlanta',
      state: 'Georgia',
      zip: '30024',
    }
    const nextAvailableTimePage = new NextAvailableTimePage(page);
    await nextAvailableTimePage.getAppointmentTimes().first().click();

    const nextStepsPage = new NextStepsPage(page);
    await nextStepsPage.getAppointmentContinue().click();

    const contactDetailsPage = new ContactDetailsPage(page);

  
    await contactDetailsPage.fillContactDetails(contactDetails);
    await contactDetailsPage.getContinueContactDetails().click();

    const shippingPage = new ShippingPage(page);
    await shippingPage.fillShippingDetails(shippingDetails);
    await shippingPage.getContinue().click();

    const paymentPage = new PaymentPage(page);
    await expect(paymentPage.getPaymentHeader()).toBeVisible();
  });
});

test.describe('POST /cappedAvailableTimes @api', () => {
  test('should return next set of available times', async ({ request }) => {
    const response = getApiAppointmentTimes(request);

    const results = (await response).json();
    expect((await response).ok()).toBeTruthy();
  });
});


export async function getApiAppointmentTimes(request: APIRequestContext) {
  return  await request.post('https://henry-prod.hasura.app/v1/graphql', {
    data: { "operationName": "cappedAvailableTimes", "variables": { "minimumDate": "2024-03-04T18:49:14.063Z", "maximumDate": "2024-03-14T18:49:14.063Z", "state": "georgia", "treatmentShortId": "weightloss" }, "query": "query cappedAvailableTimes($state: String!, $treatmentShortId: String!, $minimumDate: timestamptz!, $maximumDate: timestamptz!) {\n  cappedAvailableTimes: appointment_capped_available_appointment_slots(\n    where: {start_time: {_gt: $minimumDate, _lt: $maximumDate}, state: {_eq: $state}, treatment_object: {short_id: {_eq: $treatmentShortId}}, language: {_eq: \"en-US\"}, provider: {_and: {id: {_is_null: false}}}}\n    order_by: {start_time: asc}\n  ) {\n    ...CappedAvailableSlotsFragment\n    __typename\n  }\n}\n\nfragment CappedAvailableSlotsFragment on appointment_capped_available_appointment_slots {\n  startTime: start_time\n  endTime: end_time\n  provider {\n    id\n    displayName: display_name\n    __typename\n  }\n  __typename\n}" }
  })

}

