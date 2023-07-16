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

    // call a function which selects the WBTC token in sell field
    await selectToken({
      page,
      type: "sell",
      tokenName: constants.sellToken,
    }).then(async () => {
      await selectToken({
        page,
        type: "buy",
        tokenName: constants.buyToken,
      });
    });

    await selectSecondRoute({ page });
  } catch (error) {
    console.log("An error occurred : ", error);
  }
}

run();
