
import { test,expect } from "../Fixtures/Fixtures"

test.describe(" Testing List Creation", async () => {

    test.beforeEach(async ({ login }) => {

        await login.login('test.biobank25@gmail.com', 'Testbiobank2025.')

    })

test("TC-1: Create a List", async ({ page }) => {

    //Create a list
    //Add an image to the list 
    await page.getByRole('button', { name: 'New list' }).click();
    await page.getByRole('button', { name: 'List item' }).click();
    await page.getByRole('textbox', { name: 'Title' }).click();
    await page.getByRole('textbox', { name: 'Title' }).fill('Title List Item');
    await page.locator('.Q0hgme-LgbsSe.Q0hgme-Bz112c-LgbsSe.Ge5tnd-HiaYvf.INgbqf-LgbsSe.VIpgJd-LgbsSe.VIpgJd-LgbsSe-ZmdkE').click();
    
    await page.locator('div').filter({ hasText: /^List item 1List Item 2List Item 3$/ }).getByRole('checkbox').first().click();
    await page.getByRole('button', { name: 'Delete' }).nth(1).click();

})

test("TC-2: Mark the list item as done", async({page})=>{
    //Mark the completed items as done
    //Check if they are marked as done

    await page.getByRole('button', { name: 'New list' }).click();
    await page.getByRole('button', { name: 'List item' }).click();
    await page.getByRole('button', { name: 'List item' }).click();
    await page.getByRole('textbox', { name: 'Title' }).click();
    await page.getByRole('textbox', { name: 'Title' }).fill('Title List Item');
    await page.getByRole('button', { name: 'Close' }).click();

    
})

test("TC-3: Delete a list item", async({page})=>{
    //Delete a list item and verify if that's deleted

    await page.getByRole('button', { name: 'New list' }).click();
    await page.getByRole('button', { name: 'List item' }).click();
    await page.getByRole('button', { name: 'List item' }).click();
    await page.getByRole('textbox', { name: 'Title' }).click();
    await page.getByRole('textbox', { name: 'Title' }).fill('Title List Item');
    await page.locator('.Q0hgme-LgbsSe.Q0hgme-Bz112c-LgbsSe.Ge5tnd-HiaYvf.INgbqf-LgbsSe.VIpgJd-LgbsSe.VIpgJd-LgbsSe-ZmdkE').click();
    await page.locator('div:nth-child(2) > .Q0hgme-LgbsSe.Q0hgme-Bz112c-LgbsSe.Ge5tnd-HiaYvf').first().setInputFiles('ink.png');
    await page.getByRole('button', { name: 'Delete' }).nth(1).click();

})

})