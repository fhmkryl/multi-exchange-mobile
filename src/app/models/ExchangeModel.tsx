export default class ExchangeViewModel {
    name:string;
    serverTime: string;
    status:string;

    constructor(exchangeResponse: any) {
        console.log(exchangeResponse);
        this.name = exchangeResponse.name;
        this.serverTime = exchangeResponse.serverTime;
        this.status = exchangeResponse.status;
    }
}

