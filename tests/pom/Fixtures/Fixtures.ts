import { test as base } from '@playwright/test';
import LoginPage from '../Pages/LoginPage';
import LabelPage from '../Pages/LabelPage';
import NotePage from '../Pages/NotePage';
import ReminderPage from '../Pages/ReminderPage';
import ListPage from '../Pages/ListPage';

type myFixtures = {

  label: LabelPage;
  login: LoginPage;
  list: ListPage;
  note: NotePage
  reminder: ReminderPage;

}
// This new "test" can be used in multiple test files, and each of them will get the fixtures.

export const test = base.extend<myFixtures>({  // extend the base test as "MyFixtures". MyFixtures are my custom objects(fixtures) to inject in my tests
  label: async ({ page }, use) => {
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

export { expect, APIRequestContext, Cookie } from '@playwright/test'; // I am not using them in my class. just passing through the other test files to use them without importing.
