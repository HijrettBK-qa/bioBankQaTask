import { Page, expect } from "@playwright/test";


export default class NotePage {
    page: Page;

    constructor(page: Page) {

        this.page = page;
    }
}