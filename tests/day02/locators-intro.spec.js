import {test} from "@playwright/test";

test("Simple google test @failed", async ({page}) => {
    // test codes
    await page.goto("https://www.google.com");

     

   // let searchBox = page.locator("//textarea[@class='gLFyf']");

    let searchBox = page.getByRole('combobox', { name: 'Search' });

    // await searchBox.type("CYDEO");
    await searchBox.fill("CYDEO");

     

    await searchBox.press("Enter");

     

});

/*
<textarea jsname="yZiJbe" class="gLFyf" aria-controls="Alh6id" aria-owns="Alh6id" autofocus="" aria-label="Search" placeholder="" aria-autocomplete="both" aria-expanded="false" aria-haspopup="false" autocapitalize="off" autocomplete="off" autocorrect="off" id="ti6dpd" maxlength="2048" name="q" role="combobox" rows="1" spellcheck="false" data-ved="0ahUKEwiw0aDNuP2WAxV8FFkFHR42Df8Q39UDCBI"></textarea>
*/



