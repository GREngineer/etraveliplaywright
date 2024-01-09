import { Locator, Page } from 'playwright';
import { ElementHandle } from 'playwright';

export class BaseActions {
    public page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async waitForElementNotVisible(selector: string): Promise<void> {
        await this.page.waitForSelector(selector, { state: 'hidden' });
    }

    async waitForElementVisible(selector: string): Promise<void> {
        await this.page.waitForSelector(selector, { state: 'visible' });
    }

    async waitForElementIsClickable(selector: string): Promise<void> {
        await this.page.waitForSelector(selector, { state: 'visible' });
    }

    async getText(selector: string): Promise<string> {
        const text = await this.page.textContent(selector);
        return text === null ? "" : text; // If nothing is typed, convert null to an empty string
    }

    async click(selector: string): Promise<void> {
        await this.page.click(selector);
    }

    async clickJS(selector: string): Promise<void> {
        await this.page.evaluate((selector) => {
            const element = document.querySelector(selector);
            if (element instanceof HTMLElement) {
                element.click();
            } else {
                // Optionally handle the case where the element is not an HTMLElement
                console.error(`Element found for selector '${selector}' is not an HTMLElement.`);
            }
        }, selector);
    }

    async sendKeys(selector: string, text: string): Promise<void> {
        await this.page.fill(selector, text);
    }

    async clickEnter(selector: string): Promise<void> {
        await this.page.press(selector, 'Enter');
    }

    async scrollBottomPageJS(): Promise<void> {
        await this.page.evaluate(() => {
            window.scrollTo(0, document.body.scrollHeight);
        });
    }

    async findElements(selector: string): Promise<ElementHandle<HTMLElement | SVGElement>[]> {
        return this.page.$$(selector);
    }


}