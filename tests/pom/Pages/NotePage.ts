import { Page, expect } from "@playwright/test";


export default class NotePage {
    page: Page;

    constructor(page: Page) {

        this.page = page;
    }

    async fillNoteTitle(noteTitle: string) {
        await this.page.getByRole('textbox', { name: 'Title' }).click();
        await this.page.getByRole('textbox', { name: 'Title' }).fill('New Title');  

    }

    async writeNote(note: string) {

        await this.page.locator('p').first().scrollIntoViewIfNeeded();
        await this.page.locator('p').first().click();
        await this.page.getByRole("combobox").nth(1).fill(note);

    }
    async pinTheNote() {
        await this.page.getByRole("button", { name: "Pin note" }).first().click()
    }
    async closeNote(){
        await this.page.getByRole('button', { name: 'Close' }).click();
    }

    async verifyIfNoteIsPinned(noteTitle:string){
        await expect(this.page.getByText('It\'s note title')).toBeVisible();

    }

}