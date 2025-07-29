import { test, expect } from "../Fixtures/Fixtures"
import { faker } from "@faker-js/faker"


test.describe("TS-1: Creating notes", async () => {

  test.beforeEach(async ({ login }) => {

    await login.login('test.biobank25@gmail.com', 'Testbiobank2025.')

  })

  test("TC-1: Create a new note", async ({ page, note }) => {
    //The user should be able to create a note successfully
    //The note should have a note and a title

    const noteTitle = faker.animal.cat();

    await note.writeNote("This is an example of a note");
    await note.fillNoteTitle("Note Title: " + noteTitle)

  })
})

test.describe("TS-2: Editing notes", async () => {

  test.beforeEach(async ({ login, note }) => {

    await login.login('test.biobank25@gmail.com', 'Testbiobank2025.')
    const noteTitle = faker.animal.cat();

    await note.writeNote("This is an example of a note");
    await note.fillNoteTitle("Note Title: " + noteTitle)


  })
  test("TC-1: Pinning a note", async ({ page, note }) => {
    //The note can be pinned successfully

    await note.pinTheNote();
    await page.getByText('Pinned', { exact: true }).click({
      button: 'right'
    });
  })
  test("TC-2: Archive a note", async ({ page }) => {
    //The note should be archived successfully

    //Archive this note and check if it's in Archive tab
    await page.getByRole('button', { name: 'Archive' }).click();
    await page.getByRole('tab', { name: 'Archive' }).click();
    await expect(page.getByText('It\'s note title')).toBeVisible();
  })
  test("TC-3: Share a note", async ({ page }) => {
    //The note should be shared with an email successfully

    //share the note with an email and verify if it's shared with this email
    await page.locator('.Q0hgme-LgbsSe.Q0hgme-Bz112c-LgbsSe.euCgFf.INgbqf-LgbsSe.VIpgJd-LgbsSe.VIpgJd-LgbsSe-ZmdkE').click();
    await page.getByPlaceholder('Person or email to share with').fill('sharewiththisperson@gmail.com');
    await page.getByText('Save', { exact: true }).click();
    await expect(page.getByLabel('Shared with sharewiththisperson@gmail.com').locator('div')).toBeVisible();
  })
  test("TC-4: Label a note", async ({ page }) => {
    //The note should be labelled successfully

    await page.getByRole('button', { name: 'More' }).click();
    await page.getByText('Add label').click();
    await page.getByRole('menuitemcheckbox', { name: 'Label for Wild Turkey' }).locator('div').first().click();

    //check if the label is visible on the note
    await expect(page.getByRole('button', { name: 'Label for Wild Turkey' })).toBeVisible();
  })
  test("TC-5: Duplicate a note", async ({ page }) => {
    //The note should be duplicated successfully
    await page.getByRole('button', { name: 'More' }).click();
    await page.getByText('Make a copy').click();
    await page.getByRole('button', { name: 'Close' }).click();

    //check if it's duplicated
    await page.locator('.Q0hgme-LgbsSe.Q0hgme-Bz112c-LgbsSe.xl07Ob.INgbqf-LgbsSe.VIpgJd-LgbsSe.VIpgJd-LgbsSe-ZmdkE').click();
    await page.getByText('Make a copy').click();
    await expect(page.getByText('Pinned Note').nth(2)).toBeVisible();
  })

})

test.describe("TS-3: Deletin notes", async () => {

  test.beforeEach(async ({ login, note }) => {

    await login.login('test.biobank25@gmail.com', 'Testbiobank2025.')
    const noteTitle = faker.animal.cat();

    await note.writeNote("This is an example of a note");
    await note.fillNoteTitle("Note Title: " + noteTitle)
  })

  test("TC-3: Delete a note from note page", async ({ page, note }) => {

    //A note should be deleted successfully and sent to the trash page


    await page.getByRole('button', { name: 'Close' }).click();
    await page.locator('.Q0hgme-LgbsSe.Q0hgme-Bz112c-LgbsSe.xl07Ob.INgbqf-LgbsSe.VIpgJd-LgbsSe.VIpgJd-LgbsSe-ZmdkE').click();
    await page.getByText('Delete note').click();
    await page.getByRole('button', { name: 'Delete' }).click();

    //check if the note called "Test Note Title" is deleted
    await page.getByRole('combobox', { name: 'Search' }).fill('Test Note');
    await page.goto('https://keep.google.com/?pli=1#search/text%253Dtest%252Cnote');
    await page.getByRole('option', { name: 'Images' }).locator('div').nth(1).click();
    await page.getByRole('combobox', { name: 'Search' }).fill('🍀Test Note Title');
    await expect(page.getByText('No matching results.')).toBeVisible();

  })
  test("TC-2: Delete a note from trash", async ({ page }) => {
    //A deleted note should be deleted forever from the trash 

  })
  test("TC-3: Restore the deleted note from trash", async ({ page }) => {

    //A deleted note should be restored from the trash

  })

})

