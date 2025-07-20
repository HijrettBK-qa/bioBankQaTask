import { test, expect } from "../Fixtures/Fixtures"
import { faker } from "@faker-js/faker"


test.describe("Creating notes", async () => {

  test.beforeEach(async ({ login }) => {

    await login.login('test.biobank25@gmail.com', 'Testbiobank2025.')

  })

  test("Create a new note", async ({ page, note }) => {

    const noteTitle = faker.animal.cat();
    await page.locator('p').first().click();
    await note.writeNote("This is an example of a note");
    await note.fillNoteTitle("Note Title: " + noteTitle)

    //pin the note
  
    await note.pinTheNote();
    await page.getByText('Pinned', { exact: true }).click({
      button: 'right'
    });
    await page.getByRole('button', { name: 'Close' }).click();
    await page.getByText('It\'s note title').click({
      button: 'right'
    });
    await page.getByText('It\'s note title').click();
    await expect(page.getByRole('textbox')).toBeVisible();
    await page.locator('.VIpgJd-TUo6Hb-xJ5Hnf').first().click();
    await expect(page.getByText('It\'s note title')).toBeVisible();

    //create another note
    await page.locator('p').first().click();
    await page.getByRole('combobox').nth(1).fill('This is another note here🍀');
    await page.getByRole('textbox', { name: 'Title' }).click();
    await page.getByRole('textbox', { name: 'Title' }).fill('This is another note title🍀');
    //open the three dots and delete this note
    await page.locator('.Q0hgme-LgbsSe.Q0hgme-Bz112c-LgbsSe.xl07Ob.INgbqf-LgbsSe.VIpgJd-LgbsSe.VIpgJd-LgbsSe-ZmdkE').click();
    await page.getByText('Delete note').click();
    //share the note with an email and verify if it's shared with this email
    await page.locator('.Q0hgme-LgbsSe.Q0hgme-Bz112c-LgbsSe.euCgFf.INgbqf-LgbsSe.VIpgJd-LgbsSe.VIpgJd-LgbsSe-ZmdkE').click();
    await page.getByPlaceholder('Person or email to share with').fill('sharewiththisperson@gmail.com');
    await page.getByText('Save', { exact: true }).click();
    await expect(page.getByLabel('Shared with sharewiththisperson@gmail.com').locator('div')).toBeVisible();
    //Archive this note and check if it's in Archive tab
    await page.getByRole('button', { name: 'Archive' }).click();
    await page.getByRole('tab', { name: 'Archive' }).click();
    await expect(page.getByText('It\'s note title')).toBeVisible();

    await page.getByText('Notes', { exact: true }).click();
    await page.getByText('Pinned Note', { exact: true }).click();
    //add label to this note

    await page.getByRole('button', { name: 'More' }).click();
    await page.getByText('Add label').click();
    await page.getByRole('menuitemcheckbox', { name: 'Label for Wild Turkey' }).locator('div').first().click();
    //check if the label is visible on the note
    await expect(page.getByRole('button', { name: 'Label for Wild Turkey' })).toBeVisible();

    //Duplicate it 
    await page.getByRole('button', { name: 'More' }).click();
    await page.getByText('Make a copy').click();
    await page.getByRole('button', { name: 'Close' }).click();
    //check if it's duplicated
    await page.locator('.Q0hgme-LgbsSe.Q0hgme-Bz112c-LgbsSe.xl07Ob.INgbqf-LgbsSe.VIpgJd-LgbsSe.VIpgJd-LgbsSe-ZmdkE').click();
    await page.getByText('Make a copy').click();
    await expect(page.getByText('Pinned Note').nth(2)).toBeVisible();
  })
  test("Edit a note", async({page})=>{

  })
  test("Delete a note", async ({ page }) => {


    await page.getByRole('button', { name: 'Cancel' }).click();
    await page.getByRole('button', { name: 'Close' }).click();
    await page.locator('.Q0hgme-LgbsSe.Q0hgme-Bz112c-LgbsSe.xl07Ob.INgbqf-LgbsSe.VIpgJd-LgbsSe.VIpgJd-LgbsSe-ZmdkE').click();
    await page.getByText('Delete note').click();
    await page.getByRole('button', { name: 'Delete' }).click();
    await page.getByRole('combobox', { name: 'Search' }).click();
    await page.getByRole('combobox', { name: 'Search' }).fill('Test Note');
    await page.goto('https://keep.google.com/?pli=1#search/text%253Dtest%252Cnote');

    //check if the note called "Test Note Title" is deleted
    await page.getByRole('option', { name: 'Images' }).locator('div').nth(1).click();
    await page.getByRole('combobox', { name: 'Search' }).fill('Test Note Title');
    await expect(page.getByText('No matching results.')).toBeVisible();

  })
  test("Restore the deleted note from trash", async({page})=>{

  })

})
