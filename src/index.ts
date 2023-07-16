import puppeteer = require("puppeteer");
import {
  fillSellQuantity,
  selectChain,
  selectSecondRoute,
  selectToken,
} from "./controllers/controllers";
import constants from "./constants/constants";

async function run(): Promise<void> {
  try {
    // launching a browser in non-headless mode and the viewport set to size of browser window
    const browser = await puppeteer.launch({
      headless: false,
      defaultViewport: null,
    });

    // open a new browser page and go to the specific URL
    const page = await browser.newPage();
    await page.goto("https://swap.defillama.com/");

    // call a function which selects a chainName
    await selectChain({ page, chainName: constants.chainName });

    // call a function which fills the you sell input
    await fillSellQuantity({ page, quantity: constants.sellQuantity });

    // call a function which selects the selling token
    await selectToken({
      page,
      type: "sell",
      tokenName: constants.sellToken,
    });

    // call a function which selects the buying token
    await selectToken({
      page,
      type: "buy",
      tokenName: constants.buyToken,
    });

    // call a function which selects the second route
    await selectSecondRoute({ page });

    // finished executing
    console.log("The program finished executing successfully...");
  } catch (error) {
    // logging any error if occured
    console.log("An error occurred : ", error);
  }
}

// calling our main function
run();
