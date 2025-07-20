
import { Page, expect } from "@playwright/test";

export default class ReminderPage {

  page: Page;

  constructor(page: Page) {

    this.page = page;
  }
  //go to reminders
  async goReminders() { await this.page.getByLabel('Reminders').getByText('Reminders').click(); }

  //set a title

  async titleName(reminderTitle: string) {
    await this.page.getByRole('textbox', { name: 'Title' }).click();
    await this.page.getByRole('textbox', { name: 'Title' }).fill(reminderTitle);
  }
  //take a note
  async editNote(note: string) {
    await this.page.locator('p').first().click();
    await this.page.getByRole('combobox').fill(note);

  }

  //set a date
  async setDate() {
    await this.page.getByLabel('Reminder set for Tomorrow, 8:').nth(3).click();
    await this.page.getByText('Pick date & time').nth(1).click({
      button: 'right'
    });

    await this.page.getByPlaceholder('Add a date').click();
    await this.page.getByLabel('30 Jul').click();

  }

  //check if it's visible
  async verifyReminder() {
    await this.page.getByText('Pick date & time').nth(1).click();
    await expect(this.page.getByRole('button', { name: 'Reminder set for Tomorrow, 8:' })).toBeVisible();
  }

  //add a time
  async setTime(timePeriod: string) {

    await this.page.getByPlaceholder('Add a time').click();
    await this.page.getByText(timePeriod).click();
    await this.page.getByText('Monthly').click();
    await this.page.getByText('Pick date & timeMorning8:00').click();
  }

  //Save the changes
  async saveBtn() { await this.page.getByText('Save', { exact: true }).click(); }

  //Close the note
  async closeBtn() { await this.page.getByText('Close', { exact: true }).nth(4).click(); }

  //Delete the reminder
  async deleteReminder(reminderName: string) {
    await this.page.getByRole('button', { name: 'More' }).click();
    await this.page.getByText('Delete note', { exact: true }).click();

   

  }
  async verifyDeletion(reminderName: string) {
    
    await this.page.getByRole('combobox', { name: 'Search' }).fill(reminderName);
    await this.page.getByRole('combobox', { name: 'Search' }).press('Enter');
    await expect(this.page.getByText('No matching results.')).toBeVisible();
    console.log("🍀It seems reminder is deleted successfully!") //If I would have more time, I would make it with if statement to make it more dynamic
  }
}