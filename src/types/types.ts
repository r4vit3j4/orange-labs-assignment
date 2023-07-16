import { Page } from "puppeteer";

export interface ISelectChainProps {
  page: Page;
  chainName: string;
}

export interface IFillSellQuantityProps {
  page: Page;
  quantity: string;
}

export interface ISelectTokenProps {
  page: Page;
  type: "buy" | "sell";
  tokenName: string;
}

export interface ISelectSecondRouteProps {
  page: Page;
}
