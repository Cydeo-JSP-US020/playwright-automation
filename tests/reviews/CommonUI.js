export class CommonUI {

    static async login(page) {
        const CREDENTIALS = Buffer.from(`${process.env.SEP_USERNAME}:${process.env.SEP_PASSWORD}`).toString('base64');
        await page.setExtraHTTPHeaders( {'Authorization': `Basic ${CREDENTIALS}`} );
        await page.goto(process.env.SEP_QA_URL);
    }

}