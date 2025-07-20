import { Page, expect } from "@playwright/test";


export default class NotePage {
    page: Page;

    constructor(page: Page) {

        this.page = page;
    }

    async fillNoteTitle(noteTitle: string) {    
        await this.page.getByRole('textbox', { name: 'Title' }).fill(noteTitle);
    }

    async writeNote(note:string){
        await this.page.locator('p').first().click();
        await this.page.getByRole("combobox").fill(note);

    }
    async pinTheNote(){
        await this.page.getByRole("button",{name:"Pin note"}).click()}
    
}