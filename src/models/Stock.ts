export class Stock {
    name: string;
    price: number;

    constructor(name: string, price: number) { 
        this.name = name;
        this.price = price;
    }

    currentPrice(price: number) { 
        this.price = price;
    }
}