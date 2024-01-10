import { Page } from '@playwright/test';
import { BaseActions } from '../utils/Base';
import { Travel } from '../dtos/Travel';

export class HomePagePO extends BaseActions {
    constructor(page: Page) {
        super(page);
    }

    // Home Page Locators
    private destinationFromField = 'input#searchForm-singleBound-origin-input';
    private destinationToField = 'input#searchForm-singleBound-destination-input';
    private departureDateField = 'singleBound.departureDate';
    private returnDateField = 'input[aria-label="Return"]';
    private searchFlightButton = 'button[data-testid="searchForm-searchFlights-button"]';
    private searchFlightBanner = 'div[data-testid="searchPage-searchForm"]';
    private acceptTermsButton = 'button[data-testid="cookieBanner-confirmButton"]';
    private destinationDropdown = 'div[data-testid="etiDropdownOption"]';
    private chooseMonthArrow = 'button[data-testid="searchForm-nextMonth-input"]';
    private calendarMonthText = 'div.DayPicker-Caption';

    // Method for dynamic locator
    private flightDates(date: string) {
        return `div.DayPicker-Day[aria-label="${date}"]`;
    }

    //Accept cookies
    async clickAcceptTermsButton() {
        await this.waitForElementVisible(this.acceptTermsButton);
        await this.page.click(this.acceptTermsButton);
    }

    async fromInput(country: string) {
        await this.page.fill(this.destinationFromField, country);
        await this.waitForElementVisible(this.destinationDropdown);
        await this.page.keyboard.press('Enter');
    }

    async toInput(country: string) {
        await this.page.fill(this.destinationToField, country);
        await this.waitForElementVisible(this.destinationDropdown);
        await this.page.keyboard.press('Enter');
    }

    async selectDepartureDate(date: string, month: string) {
        await this.page.getByPlaceholder("Departure").click();
        await this.goToMonthCalendar(month);
        await this.page.click(this.flightDates(date));
    }

    async goToMonthCalendar(month: string) {
        while (await this.page.textContent(this.calendarMonthText) !== month) {
            await this.page.click(this.chooseMonthArrow);
        }
    }

    async inputReturnDate(date: string, month: string) {
        await this.page.getByPlaceholder("Return").click();
        await this.goToMonthCalendar(month);
        await this.page.click(this.flightDates(date));
    }

    async clickSearchFlightButton() {
        await this.page.click(this.searchFlightButton);
    }

    async searchForFlight(travel: Travel) {
        await this.clickAcceptTermsButton();
        await this.fromInput(travel.fromCity);
        await this.toInput(travel.toCity);
        await this.selectDepartureDate(travel.fromDate, travel.month);
        await this.inputReturnDate(travel.toDate, travel.month);
        await this.clickSearchFlightButton();
    }
}