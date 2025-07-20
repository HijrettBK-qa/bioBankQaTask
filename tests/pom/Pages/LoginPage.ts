import { Page, expect } from "@playwright/test";

export default class LoginPage {

  page: Page;

  constructor(page: Page) {

    this.page = page;
  }

  async login(email: string, password: string) {

    await this.page.goto('https://accounts.google.com/v3/signin/identifier?continue=https%3A%2F%2Fkeep.google.com%2F&followup=https%3A%2F%2Fkeep.google.com%2F&ifkv=AdBytiObFA8IEWsnEFb0h88RaFbpeGsryrtAYxy-VxFufWVJUG99bVEYXiR3Fi9Qkc-Xj3E6qZ26Tg&ltmpl=keep&passive=1209600&service=memento&flowName=GlifWebSignIn&flowEntry=ServiceLogin&dsh=S118752343%3A1752957744807578');
    await this.page.getByRole('textbox', { name: 'Email or phone' }).click();
    await this.page.getByRole('textbox', { name: 'Email or phone' }).fill(email);
    await this.page.getByRole('button', { name: 'Next' }).click();
    await this.page.getByRole('textbox', { name: 'Enter your password' }).fill(password);
    await this.page.getByRole('button', { name: 'Next' }).click();

    await expect(this.page.getByText('test.biobank25@gmail.com')).toBeVisible();

  }

}


