import { Stock } from './Stock';

export class Portfolio  {
    stocks: Stock[];

    constructor(stocks: Stock[]) {
        this.stocks = stocks;
    }

}