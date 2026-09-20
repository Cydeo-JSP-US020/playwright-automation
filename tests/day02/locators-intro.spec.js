import {test} from "@playwright/test";

test("Simple google test", async ({page}) => {
    // test codes
    await page.goto("https://www.google.com");

    await page.waitForTimeout(3000);

    let searchBox = page.locator("textarea[id='APjFqb']");

    // await searchBox.type("CYDEO");
    await searchBox.fill("CYDEO");

    await page.waitForTimeout(3000);

    await searchBox.press("Enter");

    await page.waitForTimeout(3000);

});

/*
<textarea class="gLFyf" aria-controls="Alh6id" aria-owns="Alh6id" autofocus="" title="Search" 
value="" jsaction="paste:puy29d;" aria-label="Search" placeholder="" aria-autocomplete="both" 
aria-expanded="false" aria-haspopup="false" autocapitalize="off" autocomplete="off" 
autocorrect="off" id="APjFqb" maxlength="2048" name="q" role="combobox" rows="1" 
spellcheck="false" data-ved="0ahUKEwizipyd9cOKAxWFEFkFHdRyI5MQ39UDCAc"></textarea>
*/

//textarea[@class = 'gLFyf']

