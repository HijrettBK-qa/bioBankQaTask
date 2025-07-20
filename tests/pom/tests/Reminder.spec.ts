import { faker } from "@faker-js/faker"
import { expect, test } from "../Fixtures/Fixtures"
import { verify } from "crypto"

test.describe("Testing Reminder",async()=>{

    test.beforeEach(async ({ login }) => {

        await login.login('test.biobank25@gmail.com', 'Testbiobank2025.')
    
      })
})

test("Create a reminder", async ({ page,reminder }) => {

    const note = faker.company.buzzPhrase();

    //If the user tries to create a note in Reminders page, the note should contain a date
    //The user should change the date as she likes
    //The user should remove the reminder from the note and check "Reminder is deleted" 
    await page.getByRole('textbox', { name: 'Title' }).click();
    
    await reminder.goReminders();
    await reminder.editNote("Taking a note about  "+ note);
    await reminder.titleName("Note title: "+ note)

    await reminder.setDate();
    await reminder.setTime("Morning"); // Add "Morning", "Afternoon","Evening", "Night", "Custom
 
    //check if the reminder is set successfully
    await reminder.verifyReminder();
    await reminder.saveBtn();
    await reminder.closeBtn();

    await page.locator('p').first().click();
    await page.getByRole('button', { name: 'Delete reminder' }).click();

})

test("Delete a reminder", async ({ page,reminder }) => {

    const note = faker.company.buzzPhrase();
    await reminder.goReminders();
    await reminder.editNote("Taking a note about  "+ note);
    await reminder.titleName("Note title: "+ note)

    await reminder.deleteReminder(note);
    await reminder.verifyDeletion(note);

    
})