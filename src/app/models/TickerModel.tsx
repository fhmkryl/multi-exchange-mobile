export default class TickerModel {
    exchangeName : string;
    symbol : string;
    price: number;
    lastUpdateTime : string;

    constructor(tickerResponse: any){
        this.exchangeName = tickerResponse.exchangeName;
        this.symbol = tickerResponse.symbol;
        this.price = tickerResponse.price;
        this.lastUpdateTime = tickerResponse.lastUpdateTime;
    }
}

