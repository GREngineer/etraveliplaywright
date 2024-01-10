import { test, expect } from "@playwright/test";
import { HomePagePO } from "../pages/HomePagePO";
import { ResultsPO } from "../pages/ResultsPO";
import { FiltersPO } from "../pages/FiltersPO";
import { Travel } from "../dtos/Travel";
import { SlidersEnum } from "../enums/SlidersEnum";

test.describe("Test1Filtering", () => {
  let homepage: HomePagePO;
  let results: ResultsPO;
  let filters;

  test.beforeAll(async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.setViewportSize({width: 1920, height: 1080})
    await page.goto("https://www.flightnetwork.com/");
    homepage = new HomePagePO(page);
    results = new ResultsPO(page);
    filters = new FiltersPO(page);
  });

    //Function to verify 4 columns appear
    async function verifySummaryResultsStep1() {
      const expectedMap = {
        Recommended: "Recommended",
        Promotion: "Promotion",
        Cheapest: "Cheapest",
        Shortest: "Shorest",
      };
      await results.verifySummaryResults(expectedMap);
    }

    async function searchFlight() {
      const travel = new Travel();
      await homepage.searchForFlight(travel);
    }

  test("Search for a Flight from New York to London and verify summary results with all filters applied in default state.", async () => {
    const travel = new Travel();
    await homepage.searchForFlight(travel);
    await verifySummaryResultsStep1();
  });

  test("Search for a Flight from New York to London and verify you have at least 1 result with all filters applied in default state.", async () => {
    await results.verifyNumberOfFlights("Greater than 0");
  });

  test("Update Filters and Verify results include only selected Flight Company", async () => {
    await filterFlightTestStep3();
    await results.verifyCompanyName("American Airlines");
  });

  //Function that applies more filters to the flight search
  async function filterFlightTestStep3() {
    await filters.clickFiltersButton();
    await filters.clickNonStopFlight();
    await filters.clickClearAllAirlinesButton();
    await filters.clickAmericanAirlinesCheckbox();
    await filters.cancelModal(); 
    await filters.clickDoneButton();
    //Ideally with more time would have  a function to test slider enums, arrival - departure - travel time sliders
  }
});
