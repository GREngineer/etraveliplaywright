import { Page } from "@playwright/test";
import { SlidersEnum } from "../enums/SlidersEnum";

class FiltersPO {
  private page: Page;

  // Full list of locators
  private clearButton = 'button[data-testid="filtersForm-resetFilters-button"]';
  private doneButton = 'button[data-testid="filtersForm-applyFilters-button"]';
  private filtersButton =
    'button[data-testid="resultPage-toggleFiltersButton-button"]';
  private allFilters = 'div[data-testid="resultPage-searchFilters-content"]';
  private clearAllAirlinesButton =
    'div[data-testid="resultPage-AIRLINESFilter-content"] span:nth-child(1)';
  private selectAllAirlinesButton =
    'div[data-testid="resultPage-AIRLINESFilter-content"] span:nth-child(2)';
  private americanAirlinesCheckbox = "input#airlines-AA";
  private nonStopButton = 'label[data-testid="MAX_STOPS-direct"]';
  private maxOneStopButton = 'label[data-testid="MAX_STOPS-max1"]';
  private allStopsButton = 'label[data-testid="MAX_STOPS-all"]';
  private departureGoRadioButton = "input#departure-0";
  private departureReturnRadioButton = "input#departure-1";
  private arrivalGoRadioButton = "input#arrival-0";
  private arrivalReturnRadioButton =
    'input[data-testid="resultPage-departureArrivalFilter-arrival1-radio"]';
  private goSliderButtonMin =
    'div[data-testid="resultPage-departureArrivalFilter-departure0-slider"] div[data-testid="handle-0"]';
  private goSliderButtonMax =
    'div[data-testid="resultPage-departureArrivalFilter-departure0-slider"] div[data-testid="handle-1"]';
  private returnSliderButtonMin =
    'div[data-testid="resultPage-departureArrivalFilter-departure1-slider"] div[data-testid="handle-0"]';
  private returnSliderButtonMax =
    'div[data-testid="resultPage-departureArrivalFilter-departure1-slider"] div[data-testid="handle-1"]';
  private travelTimeSliderButton =
    'div[data-testid="resultPage-TRAVEL_TIMEFilter-content"] div[data-testid="handle-0"]';
  private priceSliderButtonMin =
    'div[data-testid="resultPage-PRICEFilter-content"] div[data-testid="handle-0"]';
  private priceSliderButtonMax =
    'div[data-testid="resultPage-PRICEFilter-content"] div[data-testid="handle-1"]';

  constructor(page: Page) {
    this.page = page;
  }

  async clickFiltersButton(): Promise<FiltersPO> {
    await this.page.click(this.filtersButton);
    await this.page.isVisible(this.allFilters);
    return this;
  }

  async clickNonStopFlight(): Promise<FiltersPO> {
    await this.page.click(this.nonStopButton);
    return this;
  }

  async clickAllStopsButton(): Promise<FiltersPO> {
    await this.page.click(this.allStopsButton);
    return this;
  }

  async clickMaxOneStopButton(): Promise<FiltersPO> {
    await this.page.click(this.maxOneStopButton);
    return this;
  }

  async clickClearAllAirlinesButton(): Promise<FiltersPO> {
    await this.page.click(this.clearAllAirlinesButton);
    return this;
  }

  async clickSelectAllAirlinesButton(): Promise<FiltersPO> {
    await this.page.click(this.selectAllAirlinesButton);
    return this;
  }

  async clickAmericanAirlinesCheckbox(): Promise<FiltersPO> {
    await this.page.click(this.americanAirlinesCheckbox);
    return this;
  }

  async clickArrivalGoRadioButton(): Promise<FiltersPO> {
    await this.page.click(this.arrivalGoRadioButton);
    return this;
  }

  async clickArrivalReturnRadioButton(): Promise<FiltersPO> {
    await this.page.click(this.arrivalReturnRadioButton);
    return this;
  }

  async clickClearButton(): Promise<FiltersPO> {
    await this.page.click(this.clearButton);
    return this;
  }

  async clickDoneButton(): Promise<FiltersPO> {
    await this.page.click(this.doneButton);
    return this;
  }

  async slideFilters(
    slider: SlidersEnum,
    xOffset: number,
    yOffset: number
  ): Promise<FiltersPO> {
    let sliderSelector: string = "";

    switch (slider) {
      case SlidersEnum.minPrice:
        sliderSelector = this.priceSliderButtonMin;
        break;
      case SlidersEnum.maxPrice:
        sliderSelector = this.priceSliderButtonMax;
        break;
      case SlidersEnum.travelTime:
        sliderSelector = this.travelTimeSliderButton;
        break;
      case SlidersEnum.goDepartureMax:
        sliderSelector = this.goSliderButtonMax;
        break;
      case SlidersEnum.returnArrivalMin:
        sliderSelector = this.returnSliderButtonMin;
        break;
      default:
        throw new Error("Invalid slider type");
    }

    // Method that simulates user interacting with slider
    console.log("Slider selector value:", sliderSelector);
    const sliderElement = await this.page.$(sliderSelector);
    if (sliderElement) {
      await sliderElement.hover();
      await sliderElement.dispatchEvent("mousedown", { button: "left" });
      await this.page.mouse.move(xOffset, yOffset);
      await this.page.mouse.up();
    }
    return this;
  }

  //Method to close window that asks user why they're navigating away
  async cancelModal() {
    this.page
      .locator(
        "button.QSIWebResponsiveDialog-Layout1-SI_1DOwGSnaGXMzAHs_close-btn"
      )
      .click();
    return this;
  }
}

export { FiltersPO };
