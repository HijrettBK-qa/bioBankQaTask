
import { test, expect } from "../Fixtures/Fixtures"
import{faker} from "@faker-js/faker"


test.describe("TS-1: Testing Labelling", async () => {

    test.beforeEach(async ({ login }) => {

        await login.login('test.biobank25@gmail.com', 'Testbiobank2025.')

    })
    test("TC-1: A new label should be created successfully", async ({ page,label }) => {

        const labelName = faker.animal.bird();

        await label.clkEditLabel();
        await label.createNewLabel("Label for "+ labelName)
        
        console.log("Label for"+ labelName);

        await label.deleteFirstLabelAndVerify();
        await label.doneBtn();

    })

    test("TC-2: If the label name exists, new one should not be created", async({page,label})=>{
        const labelName = faker.animal.bird();

        await label.clkEditLabel();
        await label.createNewLabel("Label for "+ labelName)
        await label.doneBtn();
        await page.waitForTimeout(5000);

        await label.clkEditLabel();
        await label.createNewLabel("Label for "+ labelName);
        await label.checkDuplicatedLabel();  

    })

    test("TC-3: A note should be successfully labelled", async()=>{
        
    })

   
})

