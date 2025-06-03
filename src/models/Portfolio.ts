import { Stock } from './Stock';

export interface StockAllocation {
    [symbol: string]: number;
}

export class Portfolio {
    stocks: any[] = [];
    moneyAvaliable: number;
    allocated: StockAllocation = {};

    constructor(money: number) {
        this.moneyAvaliable = money;
    }

    updateAllocatedStock(allocated: StockAllocation) {
        this.allocated = allocated;
    }

    getPercentageAvaliable() {
        return Object.values(this.allocated).reduce((sum, val) => sum + val, 0);
    }

    getPercentageRemaining(): number {
        return 100 - this.getPercentageAvaliable();
    }
}