export class Stock {
    name: string;
    currentPrice: number;

    constructor(name: string, price: number) { 
        this.name = name;
        this.currentPrice = price;
    }

    updatePrice(price: number) { 
        this.currentPrice = price;
    }
}