export default class TickerModel {
    exchangeName: string;
    symbol: string;
    price: number;
    priceInDollar: number;
    priceChange: number;
    priceChangePercent: number;
    openPrice: number;
    highPrice: number;
    lowPrice: number;
    closePrice: number;
    volume: number;
    lastUpdateTime: Date;
    direction: string;

    constructor(response: any) {
        this.exchangeName = response.exchangeName;
        this.symbol = response.symbol;
        this.price = this.formatDecimal(response.price,8);
        this.priceInDollar = this.formatDecimal(response.priceInDollar,2);
        this.priceChange = this.formatDecimal(response.priceChange,2);
        this.priceChangePercent= this.formatDecimal(response.priceChangePercent,2);
        this.openPrice =  this.formatDecimal(response.openPrice,8);
        this.highPrice =  this.formatDecimal(response.highPrice,8);
        this.lowPrice = this.formatDecimal(response.lowPrice,8);
        this.closePrice =  this.formatDecimal(response.closePrice,8);
        this.volume =  this.formatDecimal(response.volume,0);
        this.lastUpdateTime = response.lastUpdateTime;
        this.direction = response.direction;
    }

    private formatDecimal = (val: string, digits: number): number  => {
        return parseFloat(parseFloat(val).toFixed(digits)); 
    }
}

