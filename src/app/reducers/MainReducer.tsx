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
    case 'GET_TICKERS_BY_EXCHANGE_ACTION':
      return {
        ...state,
        tickersByExchange: action.tickersByExchange
      };
    case 'ADD_OR_UPDATE_TICKER_BY_EXCHANGE':
      let arr = updateObjectInArray(state.tickersByExchange, action);
      return {
        ...state,
        tickersByExchange: arr
      };
    default:
      break;
  }
  return state;
}

function updateObjectInArray(array: any, action: any) {
  let newTicker = action.ticker;
  if(array.length === 0) {
      return [...array, newTicker];
  }

  let existingTicker = array.find((item: any) => item.symbol === newTicker.symbol);
  if(existingTicker){
    existingTicker.price = newTicker.price;
    return [...array];
  }
  else{
    return [...array, newTicker];
  }
  
//   return array.map((item: any, index: any) => {
//     if (index !== action.index) {
//       return item
//     }
// ​
//     // Otherwise, this is the one we want - return an updated value
//     return {
//       ...item,
//       ...action.item
//     }
//   });
}

const addOrUpdateTickerByExchange = (tickerList : TickerModel[], ticker: TickerModel) : TickerModel[] => {
  if(tickerList.length > 0){
    let existingTicker = tickerList.find((item) => item.exchangeName === ticker.exchangeName && item.symbol === ticker.symbol);
    if(existingTicker){
      existingTicker.price = ticker.price;
      existingTicker.lastUpdateTime = ticker.lastUpdateTime;
    }
    else{
      tickerList.push(ticker);
    }
  }else{
    tickerList.push(ticker);
  }

  return tickerList;
}

export default mainReducer;