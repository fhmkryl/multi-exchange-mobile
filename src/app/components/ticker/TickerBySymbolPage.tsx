import * as React from 'react';
import { connect } from 'react-redux';
import socketIOClient from 'socket.io-client';
import TickerModel from 'app/models/TickerModel';
import TickerList from './TickerList';
import { TextField, LinearProgress, Typography, Tabs, Tab, Paper } from '@material-ui/core';
import { RouteProps } from 'react-router';
import { TickerType } from 'app/models/TickerType';

interface TickerBySymbolPageProps extends RouteProps {
    isLoading: boolean,
    filterText: string,
    symbol: string,
    tickersBySymbol: TickerModel[],
    getTickersBySymbol: (tickers: TickerModel[]) => TickerModel[],
    setFilterTickerBySymbol: (filterText: string) => void,
    setIsLoadingFlag: (isLoadingFlag: boolean) => void
}

let socket : any;
class TickerBySymbolPage extends React.Component<TickerBySymbolPageProps> {
    constructor(props: TickerBySymbolPageProps) {
        super(props);

        socket = socketIOClient('http://localhost:2999');
        this.state = {
            isLoading: true,
            tabIndex: 0,
            filterText: '',
            symbol: this.props.match.params.symbol,
            tickersByExchange: []
        };
    }

    componentDidMount = () => {
        let self = this;
        socket.emit('subscribeToSymbol', self.state.symbol);
        socket.on('onTickersReceivedBySymbol', function (data: any) {
            let tickerList: TickerModel[] = [];
            data.tickerList.map((item: any) => {
                let newItem = new TickerModel(item);
                tickerList.push(newItem);
            });

            self.props.getTickersBySymbol(tickerList);
        });
    }

    componentWillUnmount = () => {
        socket.close();
    }


    onSearchChangeHandler = () => (event: any) => {
        this.props.setIsLoadingFlag(true);

        this.props.setFilterTickerBySymbol(event.target.value);
    };

    render() {
        const tickers = this.props.tickersBySymbol;

        let loaderPanel = <div></div>;
        let tickersPanel = <div></div>;
        if (this.props.isLoading || !tickers || tickers.length === 0) {
            loaderPanel = <div style={{ width: 600 }}>
                <LinearProgress variant="query" style={{ backgroundColor: '#FFCC00' }} />
            </div>
        }
        else {
            tickersPanel = <TickerList tickerType = {TickerType.BySymbol} tickerList={tickers} />
        }

        return (
            <div>
                <div>
                    {loaderPanel}
                </div>
                <TextField
                    id="standard-search"
                    label="Search"
                    type="search"
                    margin="normal"
                    style={{ width: 600 }}
                    onChange={this.onSearchChangeHandler()}
                />
                <div style={{ width: 600 }}>
                    {tickersPanel}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state: any) => {
    return {
        isLoading: state.isLoading,
        exchangeName: state.exchangeName,
        filterTickersBySymbolText: state.filterTickersBySymbolText,
        tickersBySymbol: state.tickersBySymbol
    };
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        setIsLoadingFlag: (isLoading: boolean) => {
            dispatch({ type: 'SET_IS_LOADING_ACTION', isLoading: isLoading })
        },
        getTickersBySymbol: (tickers: TickerModel[]) => {
            dispatch({ type: 'GET_TICKERS_BY_SYMBOL_ACTION', tickersBySymbol: tickers });
        },
        setFilterTickerBySymbol: (filterText: string) => {
            dispatch({ type: 'SET_FILTER_TICKERS_BY_SYMBOL_ACTION', filterTickersBySymbolText: filterText })
        }

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TickerBySymbolPage)
