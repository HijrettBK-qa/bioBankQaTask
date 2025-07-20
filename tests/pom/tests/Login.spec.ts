
import { test, expect } from "../Fixtures/Fixtures";

test("Login to Google Keep account", async ({ page }) => {
    await page.goto('https://accounts.google.com/v3/signin/identifier?continue=https%3A%2F%2Fkeep.google.com%2F&followup=https%3A%2F%2Fkeep.google.com%2F&ifkv=AdBytiObFA8IEWsnEFb0h88RaFbpeGsryrtAYxy-VxFufWVJUG99bVEYXiR3Fi9Qkc-Xj3E6qZ26Tg&ltmpl=keep&passive=1209600&service=memento&flowName=GlifWebSignIn&flowEntry=ServiceLogin&dsh=S118752343%3A1752957744807578');
    await page.getByRole('textbox', { name: 'Email or phone' }).click();
    await page.getByRole('textbox', { name: 'Email or phone' }).fill('test.biobank25@gmail.com');
    await page.getByRole('button', { name: 'Next' }).click();
    await page.getByRole('textbox', { name: 'Enter your password' }).fill('Testbiobank2025.');
    await page.getByRole('button', { name: 'Next' }).click();
    await expect(page.getByText('Biobank Test')).toBeVisible();
    await page.getByText('test.biobank25@gmail.com').click();
    await expect(page.getByText('test.biobank25@gmail.com')).toBeVisible();
    await page.getByRole('button', { name: 'Next' }).click();

}),

    test("Login by using POM", async ({ page, login }) => {

        await login.login('test.biobank25@gmail.com', 'Testbiobank2025.')

    })

test("Sign out", async ({ page, login }) => {
    await login.signout();
    await login.verifyLogout();
})

