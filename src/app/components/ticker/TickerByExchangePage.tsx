import * as React from 'react';
import { connect } from 'react-redux';
import socketIOClient from 'socket.io-client';
import TickerModel from 'app/models/TickerModel';
import TickerList from './TickerList';
import { TextField } from '@material-ui/core';

interface TickerByExchangePageProps {
    filterText: string,
    exchangeName: string,
    tickersByExchange: TickerModel[],
    getTickersByExchange : (tickers:TickerModel[]) => TickerModel[],
    setFilterTickerByExchange: (filterText:string) => void
}

class TickerByExchangePage extends React.Component<TickerByExchangePageProps> {
    state = {
        filterText: '',
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
            
            self.props.getTickersByExchange(tickerList);
        });
    }

    
    onSearchChangeHandler = () => (event:any) => {
        this.props.setFilterTickerByExchange(event.target.value);
    };

    render() {
        const tickers = this.props.tickersByExchange;
        if (tickers && tickers.length > 0) {
            return (
                <div>
                    <TextField
                        id="standard-search"
                        label="Search"
                        type="search"
                        margin="normal"
                        style={{width:600}}
                        onChange = {this.onSearchChangeHandler()}
                        />
                    <TickerList tickerList = {tickers} />
                </div>
            )
        }
        return (
            <div>Loading...</div>
        )
    }
}

const mapStateToProps = (state: any) => {
    return { 
        exchangeName: state.exchangeName,
        filterTickersByExchangeText : state.filterTickersByExchangeText,
        tickersByExchange: state.tickersByExchange 
    };
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        getTickersByExchange : (tickers : TickerModel[]) => {
            dispatch({ type: 'GET_TICKERS_BY_EXCHANGE_ACTION', tickersByExchange: tickers })
        },
        setFilterTickerByExchange:(filterText: string) => {
            dispatch({ type: 'SET_FILTER_TICKERS_BY_EXCHANGE_ACTION', filterTickersByExchangeText: filterText })
        }

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TickerByExchangePage)
