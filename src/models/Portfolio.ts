import { Stock } from './Stock';

export interface StockAllocation {
    [symbol: string]: number;
}

export class Portfolio {
    stocks: Stock[] = [];
    moneyAvaliable: number;
    valorization: number = 0;
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

      updateStocksPrices(currentPrice: Record<string, number>) {
        var totalValorization = 0
        for (const stock of this.stocks) {
          stock.currentPrice(currentPrice[stock.name]);
          totalValorization = totalValorization + stock.currentValorization();
        }
        this.valorization = totalValorization;
      }
    
      rebalance(currentPrice: Record<string, number>) {
        const operations: { name: string; action: 'comprar' | 'vender'; amount: number }[] = [];
        
        this.updateStocksPrices(currentPrice);

        for (const stock of this.stocks) {
            const stockValorization = stock.currentValorization();
            const portfolioPercentage = Math.floor((stockValorization * 100) / this.valorization);
            const difference = this.allocated[stock.name] - portfolioPercentage;
            
            const money = (difference * this.valorization) / 100;
            const amountToFix = Math.floor(money / stock.price);

            const newStock = new Stock(stock.name, stock.price, stock.amount);
            operations.push({
                name: stock.name,
                action: difference >= 0 ? 'comprar' : 'vender',
                amount: difference >= 0 ? amountToFix : amountToFix * - 1,
            }); 
        }
      
        return operations;
      }
}