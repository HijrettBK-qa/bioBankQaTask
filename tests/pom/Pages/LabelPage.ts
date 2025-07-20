import { Locator, Page, expect } from "@playwright/test";

export default class LabelPage {
    page: Page;

    constructor(page: Page) {

        this.page = page;
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


}
