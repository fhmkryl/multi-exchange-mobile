import TickerModel from "app/models/TickerModel";

const initState = {
  isLoading: true,
  exchanges: [],
  filterTickersByExchangeText : '',
  tickersByExchange: []
}

const mainReducer = (state: any = initState, action: any) => {
  switch (action.type) {
    case 'SET_IS_LOADING_ACTION':
      return {
        ...state,
        isLoading: action.isLoading
      };
    case 'GET_ALL_EXCHANGES_ACTION':
      return {
        ...state,
        isLoading: false,
        exchanges: action.exchanges
      };
    case 'GET_TICKERS_BY_EXCHANGE_ACTION':
      let filteredResult = action.tickersByExchange;
      if(state.filterTickersByExchangeText){
        filteredResult = filteredResult.filter((item:TickerModel) => 
                            item.symbol.toLowerCase().indexOf(state.filterTickersByExchangeText.toLowerCase()) > -1);
      }
      return {
        ...state,
        isLoading: false,
        tickersByExchange: filteredResult
      };
    case 'SET_FILTER_TICKERS_BY_EXCHANGE_ACTION':
      return {
        ...state,
        filterTickersByExchangeText:  action.filterTickersByExchangeText
      };
    default:
      break;
  }
  return state;
}

export default mainReducer;