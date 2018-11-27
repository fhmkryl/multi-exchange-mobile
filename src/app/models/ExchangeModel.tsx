export default class ExchangeModel {
    name:string;
    serverTime: string;
    status:string;

    constructor(exchangeResponse: any) {
        this.name = exchangeResponse.name;
        this.serverTime = exchangeResponse.serverTime;
        this.status = exchangeResponse.status;
    }
}

