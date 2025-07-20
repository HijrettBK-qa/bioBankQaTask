import { test as base } from '@playwright/test';
import LoginPage from '../Pages/LoginPAge';
import LabelPage from '../Pages/LabelPage';
import NotePage from '../Pages/NotePage';
import ReminderPage from '../Pages/ReminderPage';
import ListPage from '../Pages/ListPage';

type myFixtures = {

  label:LabelPage;
  login: LoginPage;
  list: ListPage;
  note:NotePage
  reminder: ReminderPage;


}
// Extend base test by providing "todoPage" and "settingsPage".
// This new "test" can be used in multiple test files, and each of them will get the fixtures.

export const test = base.extend<myFixtures>({  // extend the test as "MyFixtures" 
  label: async ({ page }, use) => {

    // set up fixture and Use the fixture value in the test.
    await use(new LabelPage(page)); 
  },

  login: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  list: async ({ page }, use) => {
    await use(new ListPage(page));
  },
  note: async ({ page }, use) => {
    await use(new NotePage(page));

  },
  reminder: async ({ page }, use) => {
    await use(new ReminderPage(page));

  }
})

export { expect, APIRequestContext, Cookie } from '@playwright/test';
