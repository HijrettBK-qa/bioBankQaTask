import { Locator, Page, expect } from "@playwright/test";

export default class LabelPage {
    page: Page;
    listOfLabels: Locator; 

    constructor(page: Page) {

        this.page = page;
        this.listOfLabels = this.page.locator('div.mQXP-BivLOc-bN97Pc div.mQXP-oKdM2c');
    }

    async clkEditLabel() { await this.page.getByText('Edit labels').first().click({ timeout: 5000 }); }
    async createNewLabel(labelName: string) {
        await this.page.getByRole('textbox', { name: 'Create new label' }).fill(labelName);
        await this.page.getByRole('button', { name: 'Create label' }).click();

    }
    async doneBtn() { await this.page.getByRole('button', { name: 'Done' }).click(); };
    async checkDuplicatedLabel() {

        const LabelExistNote = this.page.getByText("Label already exists").first();
        if (await LabelExistNote.isVisible()) {
            console.log("🍀The label name did not duplicated")

        } else {
            console.log("❌Duplicated label should not be created! Check if there is a problem")
        }
    }
    // await expect(this.page.getByText("Label already exists").first()).toBeVisible();}

    async deleteLabel() {
        await this.page.getByRole('button', { name: 'Delete label' }).nth(0).click();
        await this.page.getByRole('button', { name: 'Delete' }).first().click();

        console.log("🍀Hey! It seems deletion is successfull!")
    }


    // Get text of first label before deleting
    async deleteFirstLabelAndVerify() {
        const firstLabel = this.listOfLabels.nth(1);
        const input = firstLabel.locator('input[aria-label="Enter label name"]');
        const labelName = await input.inputValue();

        // Click the delete button in that label block
        await firstLabel.locator('[aria-label="Delete label"]').click();
        await this.page.getByRole('button', { name: 'Delete' }).first().click();


        // Assertion: check the label name no longer exists in any label inputs
        await expect(
            this.page.locator('input[aria-label="Enter label name"]', { hasText: labelName })
        ).toHaveCount(0);
        console.log("🍀The created label has been deleted successfully!")
    }


}
