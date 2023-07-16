import { sleep } from "../utils/utils";
import {
  IFillSellQuantityProps,
  ISelectChainProps,
  ISelectSecondRouteProps,
  ISelectTokenProps,
} from "types";

export async function selectChain({ page, chainName }: ISelectChainProps) {
  await page.type("#react-select-2-input", chainName);
  await page.keyboard.press("Enter");
}

export async function fillSellQuantity({
  page,
  quantity,
}: IFillSellQuantityProps) {
  const inputFields = await page.$$(".chakra-input");

  //   Select the Sell input
  const youSellInputField = inputFields[0];
  await youSellInputField.click({ clickCount: 2 });

  //   Fill the input box with quantity
  await youSellInputField.type(quantity);
}

export async function selectToken({
  page,
  tokenName,
  type,
}: ISelectTokenProps) {
  // select the token buttons
  const buttons = await page.$$("div.css-1k491an > button");

  switch (type) {
    case "sell":
      // click the sell token button
      await buttons[0].click();
      break;
    case "buy":
      // click the buy token button
      await buttons[1].click();
      break;
  }

  // select the token inputs
  const tokenInput = await page.$$(".chakra-input.css-s1d1f4");
  await tokenInput[0].click();
  //  Enter the token name in the token input
  await tokenInput[0].type(tokenName);

  //   since there is a delay in filtering the tokens according to the input, we add a delay
  await sleep(500).then(async () => {
    // select the filtered tokens and click on the first token
    const filteredTokens = await page.$$(".chakra-text.css-xl3lrw");

    // since the token filtering is not proper in the given website, the usdc token selection is overwritten
    if (tokenName === "USD Coin") {
      await filteredTokens[1].click();
    } else {
      await filteredTokens[0].click();
    }
  });
}

export async function selectSecondRoute({ page }: ISelectSecondRouteProps) {
  // Since the routes data is fetched in a frequent interval, on each fetch response we will select the second route

  //   NOTE: since the fetching is done frequently, the selected position of route div may vary its position
  page.on("response", async () => {
    // wait for route div to appear in DOM
    await page.waitForSelector(".sc-d413ea6e-0.ppUJr.RouteWrapper");

    // select the routes divs
    const elements = await page.$$(".sc-d413ea6e-0.ppUJr.RouteWrapper");
    // if there are are more than 1 routes then we will click on the second route
    if (elements.length > 1) {
      await elements[1].click();
    }
  });
}
