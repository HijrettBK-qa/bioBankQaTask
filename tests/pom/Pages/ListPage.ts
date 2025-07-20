import { Page, expect } from "@playwright/test";


export default class ListPage {
    page: Page;

    constructor(page: Page) {

        this.page = page;
    }
}