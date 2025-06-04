import { Stock } from './Stock';

export interface StockAllocation {
    [symbol: string]: number;
}

export class Portfolio {
    stocks: Stock[] = [];
    moneyAvaliable: number;
    allocated: StockAllocation = {};

    constructor(money: number) {
        this.moneyAvaliable = money;
    }

    updateAllocatedStock(allocated: StockAllocation) {
        this.allocated = allocated;
    }

    getPercentageAvaliable(): number {
        return Object.values(this.allocated).reduce((sum, val) => sum + val, 0);
    }

    getPercentageRemaining(): number {
        return 100 - this.getPercentageAvaliable();
    }

    buyStocks(currentPrice: Record<string, number>) {
        this.stocks = []; 
      
        for (const symbol in this.allocated) {
          if (currentPrice[symbol] !== undefined) {
            const porcentage = this.allocated[symbol] / 100; 
            const assignMoney = this.moneyAvaliable * porcentage;
            const price = currentPrice[symbol];
            const amount = Math.floor(assignMoney / price); 
      
            const stock = new Stock(symbol, price, amount);
            this.stocks.push(stock);
          }
        }
      }
    
      rebalance(currentPrice: Record<string, number>) {
        for (const stock in this.stocks) {
            
        }
      }
      
}