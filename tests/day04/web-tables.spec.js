import { expect, test } from '@playwright/test';

test('Web Table Practice', async ({ page }) => {
    
    await page.goto("https://the-internet-5chk.onrender.com/web-tables");

    let table = page.locator("//table[@id='ctl00_MainContent_orderGrid']");
    
    let rows = await table.locator("//tr").all();

    let columns = await table.locator("//th").all();

    let cells = await table.locator("//td").all();

    expect(rows.length).toBe(9);
    expect(columns.length).toBe(13);
    expect(cells.length).toBe(104);

    for(let cell of cells){
        console.log(await cell.textContent());
    }

});


test('Web Table Practice2', async ({ page }) => {
     
    await page.goto("https://the-internet-5chk.onrender.com/web-tables");

    let table = page.locator("//table[@id='ctl00_MainContent_orderGrid']");
    
    let rows = await table.locator("//tr").all();

    // create a loop that can print each cell's data of each row.
    for(let row of rows){
        let cells = await row.locator("//td").all();
        if (cells.length > 2) {
            for(let i = 1; i < cells.length - 1; i++){
                console.log(await cells[i].textContent());
            }
            console.log("-----------------------------");
        }
    }


});


test('Web Table Practice3', async ({ page }) => {
     
    await page.goto("https://the-internet-5chk.onrender.com/web-tables");

    let table = page.locator("//table[@id='ctl00_MainContent_orderGrid']");

    let checkBoxes = await table.locator("//input[@type='checkbox']").all();

    for(let checkbox of checkBoxes){
        await checkbox.check();
        await expect(checkbox).toBeChecked();
    }

});
