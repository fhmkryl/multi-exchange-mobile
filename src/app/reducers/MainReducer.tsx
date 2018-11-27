import TickerModel from "app/models/TickerModel";

const initState = {
  exchanges: [],
  tickersByExchange: []
}

const mainReducer = (state: any = initState, action: any) => {
  switch (action.type) {
    case 'GET_ALL_EXCHANGES_ACTION':
      return {
        ...state,
        exchanges: action.exchanges
      };
    case 'GET_TICKER_BY_EXCHANGE_ACTION':
      return {
        ...state,
        tickersByExchange: action.tickersByExchange
      };
    case 'ADD_OR_UPDATE_TICKER_BY_EXCHANGE':
      let newTickersByExchange = addOrUpdateTickerByExchange(state.tickersByExchange,action.ticker);
      return {
        ...state,
        tickersByExchange: newTickersByExchange
      };
    default:
      break;
  }
  return state;
}

const addOrUpdateTickerByExchange = (tickerList : TickerModel[], ticker: TickerModel) : TickerModel[] => {
  let newTickersList: TickerModel[] = [];
  console.log(tickerList.length);
  if(tickerList.length > 0){
    let existingTicker = tickerList.find((item) => item.exchangeName === ticker.exchangeName && item.symbol === ticker.symbol);
    if(existingTicker){
      existingTicker.price = ticker.price;
      existingTicker.lastUpdateTime = ticker.lastUpdateTime;
    }
    else{
      newTickersList.push(ticker);
    }
  }else{
    tickerList.push(ticker);
  }

  return newTickersList;
}

export default mainReducer;