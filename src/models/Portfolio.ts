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
        const operaciones: { name: string; action: 'comprar' | 'vender'; amount: number }[] = [];
      
        const totalActual = this.moneyAvaliable;
      
        for (const stock of this.stocks) {
          const precioActual = currentPrice[stock.name];
          const porcentajeObjetivo = (this.allocated[stock.name] ?? 0) / 100;
          const valorObjetivo = totalActual * porcentajeObjetivo;
      
          const valorActual = stock.amount * precioActual;
          const diferencia = valorObjetivo - valorActual;
          const cantidadAjuste = Math.floor(Math.abs(diferencia / precioActual));
          console.log(stock.name, cantidadAjuste);
      
        const newStock = new Stock(stock.name, stock.price, stock.amount);
        operaciones.push({
            name: stock.name,
            action: diferencia > 0 ? 'comprar' : 'vender',
            amount: cantidadAjuste > 0 ? cantidadAjuste : cantidadAjuste * - 1,
            });
        }
      
        return operaciones;
      }
      
      
}