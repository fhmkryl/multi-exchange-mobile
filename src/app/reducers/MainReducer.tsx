import TickerModel from "app/models/TickerModel";
import ExchangeModel from "app/models/ExchangeModel";
import { List } from "linqts";

const initState = {
  isLoading: true,
  exchanges: [],
  filterTickersByExchangeText: '',
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
      let exchanges = sortExchanges(action.exchanges);
      return {
        ...state,
        isLoading: false,
        exchanges: exchanges
      };
    case 'GET_TICKERS_BY_EXCHANGE_ACTION':
      let filteredResult = action.tickersByExchange;
      if (state.filterTickersByExchangeText) {
        filteredResult = filteredResult.filter((item: TickerModel) =>
          item.symbol.toLowerCase().indexOf(state.filterTickersByExchangeText.toLowerCase()) > -1);
      }

      console.log(action.filterBy);
      filteredResult = filteredResult.filter((item: TickerModel) =>
        item.symbol.toLowerCase().endsWith(action.filterBy.toLowerCase()));

      filteredResult = sortTickers(filteredResult);

      return {
        ...state,
        isLoading: false,
        tickersByExchange: filteredResult
      };
    case 'SET_FILTER_TICKERS_BY_EXCHANGE_ACTION':
      return {
        ...state,
        filterTickersByExchangeText: action.filterTickersByExchangeText
      };
    default:
      break;
  }
  return state;
}

const sortExchanges = (exchanges: ExchangeModel[]): ExchangeModel[] => {
  let exchangeList = new List<ExchangeModel>();
  exchanges.forEach((item, index, arr) => {
    exchangeList.Add(item);
  });

  exchangeList.OrderBy(p => p.status).ThenBy(p => p.name);

  return exchangeList.ToArray();
}

const sortTickers = (tickers: TickerModel[]): TickerModel[] => {
  let tickerList = new List<TickerModel>();

  tickers.forEach((item, index, arr) => {
    tickerList.Add(item);
  });

  tickerList.OrderByDescending(p => p.price);

  return tickerList.ToArray();
}

export default mainReducer;