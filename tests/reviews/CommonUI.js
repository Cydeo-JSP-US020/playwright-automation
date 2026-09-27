import { faker } from '@faker-js/faker';

export class CommonUI {

    static async login(page) {
        const CREDENTIALS = Buffer.from(`${process.env.SEP_USERNAME}:${process.env.SEP_PASSWORD}`).toString('base64');
        await page.setExtraHTTPHeaders( {'Authorization': `Basic ${CREDENTIALS}`} );
        await page.goto(process.env.SEP_QA_URL);
    }

    static async completeStartApplicationStep(
        page,
        firstName = faker.person.firstName(),
        lastName = faker.person.lastName(),
        email = faker.internet.email(),
        phoneNumber = faker.string.numeric(10),
        howDidYouHear = 'Email'
    ) {
        await page.locator("//input[@formcontrolname='firstName']").fill(firstName);
        await page.locator("//input[@formcontrolname='lastName']").fill(lastName);
        await page.locator("//input[@formcontrolname='email']").fill(email);
        await page.locator("//input[@formcontrolname='phoneNumber']").fill(phoneNumber);

        await page.locator("//mat-label[text()='How did you hear about us?']").click();
        await page.getByRole('option', { name: howDidYouHear, exact: true }).click();
        await page.locator("//button[@class='next-button']").click();
    }


    // add a function that can complete payment plan step

}