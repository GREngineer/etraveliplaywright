import { Page, expect } from "@playwright/test";
import { BaseActions } from "../utils/Base";

export class ResultsPO extends BaseActions {
  page: Page;

  constructor(page: Page) {
    super(page);
    this.page = page;
  }

  // Define selectors
  private clearButton = 'button[data-testid="filtersForm-resetFilters-button"]';
  private doneButton = 'button[data-testid="filtersForm-applyFilters-button"]';
  private filtersButton = 'button[data-testid="resultPage-toggleFiltersButton-button"]';
  

  // Airlines
  private clearAllAirlinesButton = 'div[data-testid="resultPage-AIRLINESFilter-content"] span:nth-child(1)';
  private selectAllAirlinesButton = 'div[data-testid="resultPage-AIRLINESFilter-content"] span:nth-child(2)';
  private americanAirlinesCheckbox = "input#airlines-AA";

  // Number of stops
  private nonStopButton = 'label[data-testid="MAX_STOPS-direct"]';
  private maxOneStopButton = 'label[data-testid="MAX_STOPS-max1"]';
  private allStopsButton = 'label[data-testid="MAX_STOPS-all"]';

  // Departure - Arrival times
  private arrivalGoRadioButton = "input#arrival-0";
  private arrivalReturnRadioButton = 'input[data-testid="resultPage-departureArrivalFilter-arrival1-radio"]';

  // Clicks Filter Button and opens filter menu
  public async clickFiltersButton(): Promise<void> {
    await this.page.click(this.filtersButton);
  }

  // Clicks Non Stop Flight Button at Filters
  public async clickNonStopFlight(): Promise<void> {
    await this.page.click(this.nonStopButton);
  }

  // Clicks All Stops Flight Button at Filters
  public async clickAllStopsButton(): Promise<void> {
    await this.page.click(this.allStopsButton);
  }

  // Clicks Max one stop Flight Button at Filters
  public async clickMaxOneStopButton(): Promise<void> {
    await this.page.click(this.maxOneStopButton);
  }

  // Clicks Clear All Airlines Button at Filters
  public async clickClearAllAirlinesButton(): Promise<void> {
    await this.page.click(this.clearAllAirlinesButton);
  }

  // Clicks Select All Airlines Button at Filters
  public async clickSelectAllAirlinesButton(): Promise<void> {
    await this.page.click(this.selectAllAirlinesButton);
  }

  // Clicks American Airlines Checkbox at Filters
  public async clickAmericanAirlinesCheckbox(): Promise<void> {
    await this.page.click(this.americanAirlinesCheckbox);
  }

  // Clicks Arrival Go Radio Button at Filters
  public async clickArrivalGoRadioButton(): Promise<void> {
    await this.page.click(this.arrivalGoRadioButton);
  }

  // Clicks Arrival Return Radio Button at Filters
  public async clickArrivalReturnRadioButton(): Promise<void> {
    await this.page.click(this.arrivalReturnRadioButton);
  }

  // Clicks Clear Button at Filters
  public async clickClearButton(): Promise<void> {
    await this.page.click(this.clearButton);
  }

  // Clicks Done Button at Filters
  public async clickDoneButton(): Promise<void> {
    await this.page.click(this.doneButton);
  }

  async verifyNumberOfFlights(expectedFlightCount: string): Promise<void> {
    const numberOfFlightsText = await this.page
      .locator("span.css-1q7o3zb")
      .textContent();

    if (numberOfFlightsText !== null) {
      const match = numberOfFlightsText.match(/\d+/);
      if (match !== null) {
        const numberOfFlights = parseInt(match[0], 10);

        // Check if the actual number of flights is greater than 0
        await expect(numberOfFlights).toBeGreaterThan(0);
      } else {
        // Handle the case where no digits are found in the text
        throw new Error("No digits found in the number of flights text.");
      }
    } else {
      // Handle the case where the text content is null (element not found)
      throw new Error("Number of flights element not found.");
    }
  }

  async verifyCompanyName(expectedCompanyName: string): Promise<void> {
    const companyNameElement = await this.page
      .locator("div.e1ngmrql4")
      .first()
      .textContent();
    await expect(companyNameElement).toBe(expectedCompanyName);
  }

  async verifyDepartureTime(minTime: number, maxTime: number): Promise<void> {
    const departureTimeElement = await this.page.locator(
      "selector-for-departure-time-element"
    );
  }

  async verifyArrivalTime(minTime: number, maxTime: number): Promise<void> {
    const arrivalTimeElement = await this.page.locator(
      "selector-for-arrival-time-element"
    );
  }

  async verifyDurationTime(
    durationMinutes: number,
    isLessThan: boolean
  ): Promise<void> {
    const durationElement = await this.page.locator(
      "selector-for-flight-duration-element"
    );
  }

  async verifySummaryResults(expectedMap: {
    [key: string]: string;
  }): Promise<void> {
    for (const [key, expectedValue] of Object.entries(expectedMap)) {
      const summaryElement = await this.page.locator(
        `//span[contains(.,'${key}')]/following-sibling::span`
      );

      if (summaryElement) {
        const buttonText = await summaryElement.innerText();

        if (buttonText && parseFloat(buttonText.replace(/[^\d.]/g, "")) > 0) {
          console.log(
            `Summary element ${key} is available with value: ${buttonText}`
          );
        } else {
          console.log(`Summary element ${key} is not available or has value 0`);
        }
      } else {
        console.log(`Summary element ${key} not found`);
      }
    }
  }
}
