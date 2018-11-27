import * as React from 'react';
import { connect } from 'react-redux';
import socketIOClient from 'socket.io-client';
import TickerModel from 'app/models/TickerModel';
import TickerList from './TickerList';

interface TickerByExchangePageProps {
    addOrUpdateTickerByExchange : (ticker: TickerModel) => void,
    getTickersByExchange : (tickers:TickerModel[]) => TickerModel[]
    exchangeName: string,
    tickersByExchange: TickerModel[]
}

class TickerByExchangePage extends React.Component<TickerByExchangePageProps> {
    state = {
        exchangeName: 'Binance',
        tickersByExchange: []
    };

    constructor(props: TickerByExchangePageProps) {
        super(props);
    }

    componentDidMount = () => {
        let self = this;
        const socket = socketIOClient('http://localhost:2999');
        socket.on('onTickersReceived', function(data: any) {
            let tickerList : TickerModel [] = [];
            data.tickerList.map((item: any) => {
                let newItem = new TickerModel(item);
                tickerList.push(newItem);
            })
            
            console.log(tickerList);
            self.props.getTickersByExchange(tickerList);
        });
    }

    render() {
        const tickers = this.props.tickersByExchange;
        if (tickers && tickers.length > 0) {
            return (<TickerList
                        tickerList = {tickers}  
            />)
        }
        return (
            <div>Loading...</div>
        )
    }
}

const mapStateToProps = (state: any) => {
    return { 
        exchangeName: state.exchangeName,
        tickersByExchange: state.tickersByExchange 
    };
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        getTickersByExchange : (tickers : TickerModel[]) => {
            dispatch({ type: 'GET_TICKERS_BY_EXCHANGE_ACTION', tickersByExchange: tickers })
        },
        addOrUpdateTickerByExchange : (ticker : TickerModel) => {
            dispatch({ type: 'ADD_OR_UPDATE_TICKER_BY_EXCHANGE', ticker: ticker })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TickerByExchangePage)
