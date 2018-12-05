export default class TickerModel {
    exchangeName: string;
    symbol: string;
    price: string;
    priceChange: string;
    priceChangePercent: string;
    openPrice: string;
    highPrice: string;
    lowPrice: string;
    closePrice: string;
    volume: string;
    lastUpdateTime: Date;
    direction: string;

    constructor(response: any) {
        this.exchangeName = response.exchangeName;
        this.symbol = response.symbol;
        this.price = parseFloat(response.price).toFixed(6);
        if(parseFloat(response.priceChange) > 0){
            this.priceChange = `+${parseFloat(response.priceChange).toFixed(2)}`
        }
        else{
            this.priceChange =  parseFloat(response.priceChange).toFixed(2);
        }
        if(parseFloat(response.priceChangePercent) > 0){
            this.priceChangePercent = `+${parseFloat(response.priceChangePercent).toFixed(2)}`;
        }
        else{
            this.priceChangePercent =  parseFloat(response.priceChangePercent).toFixed(2);
        }
        this.openPrice =  parseFloat(response.openPrice).toFixed(6);;
        this.highPrice =  parseFloat(response.highPrice).toFixed(6);
        this.lowPrice = parseFloat(response.lowPrice).toFixed(6);
        this.closePrice =  parseFloat(response.closePrice).toFixed(6);
        this.volume =  parseFloat(response.volume).toFixed(0);
        this.lastUpdateTime = response.lastUpdateTime;
        this.direction = response.direction;
    }
}

