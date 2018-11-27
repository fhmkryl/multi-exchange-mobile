import * as React from 'react';
import { connect } from 'react-redux';
import socketIOClient from 'socket.io-client';
import TickerModel from 'app/models/TickerModel';

interface TickerByExchangePageProps {
    addOrUpdateTickerByExchange : (ticker: TickerModel) => void,
    getTickersByExchange: (tickers: TickerModel[]) => TickerModel[],
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
            let tickerModel = new TickerModel(data.tickerList);
            self.props.addOrUpdateTickerByExchange(tickerModel);
        });
    }

    render() {
        const tickers = this.props.tickersByExchange;
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
        addOrUpdateTickerByExchange : (ticker : TickerModel) => {
            dispatch({ type: 'ADD_OR_UPDATE_TICKER_BY_EXCHANGE', ticker: ticker })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TickerByExchangePage)
