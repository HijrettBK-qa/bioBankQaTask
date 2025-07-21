
import { test, expect } from "../Fixtures/Fixtures";


test("TC-1: Login", async ({ page, login }) => {

    await login.login('test.biobank25@gmail.com', 'Testbiobank2025.')
    await login.verifyLogin('test.biobank25@gmail.com')

})

test("TC-2: Sign out", async ({ page, login }) => {

    await login.login('test.biobank25@gmail.com', 'Testbiobank2025.')
    await login.signout();
    await login.verifySignout();
})

