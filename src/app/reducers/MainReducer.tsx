import TickerModel from "app/models/TickerModel";
import ExchangeModel from "app/models/ExchangeModel";
import { List } from "linqts";

const initState = {
  isLoading: true,
  exchanges: [],
  filterTickersByExchangeText: '',
  tickersByExchange: [],
  filterTickersBySymbolText: '',
  tickersBySymbol: []
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
      let exchangeTickers = filterTickersByExchange(action, state);
      exchangeTickers = sortTickers(exchangeTickers);

      return {
        ...state,
        isLoading: false,
        tickersByExchange: exchangeTickers
      };
    case 'SET_FILTER_TICKERS_BY_EXCHANGE_ACTION':
      return {
        ...state,
        filterTickersByExchangeText: action.filterTickersByExchangeText
      };
      case 'GET_TICKERS_BY_SYMBOL_ACTION':
      let symbolTickers = filterTickersBySymbol(action, state);
      return {
        ...state,
        isLoading: false,
        tickersBySymbol: symbolTickers
      };
    case 'SET_FILTER_TICKERS_BY_SYMBOL_ACTION':
      return {
        ...state,
        filterTickersBySymbolText: action.filterTickersBySymbolText
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

const filterTickersByExchange = (action: any, state: any): TickerModel[] => {
  let filteredResult = action.tickersByExchange;
  filteredResult = filteredResult.filter((item: TickerModel) => item.exchangeName.toLowerCase() === action.exchangeName.toLowerCase());
  if (state.filterTickersByExchangeText) {
    filteredResult = filteredResult.filter((item: TickerModel) =>
      item.symbol.toLowerCase().indexOf(state.filterTickersByExchangeText.toLowerCase()) > -1);
  }

  filteredResult = filteredResult.filter((item: TickerModel) =>
    item.symbol.toLowerCase().endsWith(action.filterBy.toLowerCase()));

  return filteredResult;
}

const filterTickersBySymbol = (action:any, state: any) : TickerModel[] => {
  let filteredResult = action.tickersBySymbol;
  if (state.filterTickersBySymbolText) {
    filteredResult = filteredResult.filter((item: TickerModel) =>
      item.exchangeName.toLowerCase().indexOf(state.filterTickersBySymbolText.toLowerCase()) > -1);
  }

  return filteredResult;
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