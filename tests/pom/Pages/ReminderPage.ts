
import { Page, expect } from "@playwright/test";

export default class ReminderPage {

  page: Page;

  constructor(page: Page) {

    this.page = page;
  }
  //go to reminders
  async goReminders() { await this.page.getByLabel('Reminders').getByText('Reminders').click(); }

  //click "take a note"
  async takeANote() { await this.page.locator('p').first().click() };

  //set a title

  async titleName(reminderTitle: string) {
    await this.page.getByRole('textbox', { name: 'Title' }).click();
    await this.page.getByRole('textbox', { name: 'Title' }).fill(reminderTitle);
  }
  //take a note
  async editNote(note: string) {
    await this.page.locator('p').first().click();
    await this.page.getByRole('combobox').filter({ hasText: 'Taking a note' }).fill(note);

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
    await this.page.getByText(timePeriod).click(); // Add "Morning", "Afternoon","Evening", "Night", "Custom
    await this.page.getByText('Monthly').click();
    await this.page.getByText('Pick date & timeMorning8:00').click();
  }

  //Save the changes
  async saveBtn() { await this.page.getByText('Save', { exact: true }).click(); }

  //Close the note
  async closeBtn() { await this.page.getByText('Close', { exact: true }).nth(4).click(); }

}