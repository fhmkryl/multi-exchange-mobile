import * as React from 'react';
import { connect } from 'react-redux';
import socketIOClient from 'socket.io-client';
import TickerModel from 'app/models/TickerModel';
import TickerList from './TickerList';
import { TextField, LinearProgress, ListItem, ListItemText, Typography, Tabs, Tab, AppBar, Paper } from '@material-ui/core';
import { RouteProps } from 'react-router';

interface TickerByExchangePageProps extends RouteProps {
    isLoading: boolean,
    filterText: string,
    exchangeName: string,
    tickersByExchange: TickerModel[],
    getTickersByExchange: (tickers: TickerModel[], exchangeName: string, filterBy: string) => TickerModel[],
    setFilterTickerByExchange: (filterText: string) => void,
    setIsLoadingFlag: (isLoadingFlag: boolean) => void
}

class TickerByExchangePage extends React.Component<TickerByExchangePageProps> {
    constructor(props: TickerByExchangePageProps) {
        super(props);

        this.state = {
            isLoading: true,
            tabIndex: 0,
            filterBy: 'BTC',
            filterText: '',
            exchangeName: this.props.match.params.exchange,
            tickersByExchange: []
        };
    }

    handleTabChange = (event: any, value: number) => {
        let filterBy = 'BTC';
        if (value === 1) {
            filterBy = 'USDT';
        }

        this.setState({ tabIndex: value, filterBy: filterBy });
    };

    componentDidMount = () => {
        let self = this;
        const socket = socketIOClient('http://localhost:2999');
        socket.on('onTickersReceived', function (data: any) {
            let tickerList: TickerModel[] = [];
            data.tickerList.map((item: any) => {
                let newItem = new TickerModel(item);
                tickerList.push(newItem);
            });

            self.props.getTickersByExchange(tickerList, self.state.exchangeName, self.state.filterBy);
        });
    }


    onSearchChangeHandler = () => (event: any) => {
        this.props.setIsLoadingFlag(true);

        this.props.setFilterTickerByExchange(event.target.value);
    };

    render() {
        const tickers = this.props.tickersByExchange;

        let tabIndex = this.state.tabIndex;
        let loaderPanel = <div></div>;
        let tickersPanel = <div></div>;
        if (this.props.isLoading) {
            loaderPanel = <div style={{ width: 600 }}>
                <LinearProgress variant="query" />
            </div>
        }
        else {
            tickersPanel = <TickerList tickerList={tickers} />
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
                    <Paper>
                        <Tabs
                            value={tabIndex}
                            onChange={this.handleTabChange}
                            centered
                            style={{
                                backgroundColor: '#3E3E3E',
                                color: 'white'
                            }}
                        >
                            <Tab label="BTC" />
                            <Tab label="USDT" />
                        </Tabs>
                    </Paper>
                    {
                        <Typography component="div">
                            {tickersPanel}
                        </Typography>
                    }
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state: any) => {
    return {
        isLoading: state.isLoading,
        exchangeName: state.exchangeName,
        filterTickersByExchangeText: state.filterTickersByExchangeText,
        tickersByExchange: state.tickersByExchange
    };
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        setIsLoadingFlag: (isLoading: boolean) => {
            dispatch({ type: 'SET_IS_LOADING_ACTION', isLoading: isLoading })
        },
        getTickersByExchange: (tickers: TickerModel[], exchangeName: string, filterBy: string) => {
            dispatch({ type: 'GET_TICKERS_BY_EXCHANGE_ACTION', tickersByExchange: tickers, exchangeName: exchangeName, filterBy: filterBy });
        },
        setFilterTickerByExchange: (filterText: string) => {
            dispatch({ type: 'SET_FILTER_TICKERS_BY_EXCHANGE_ACTION', filterTickersByExchangeText: filterText })
        }

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TickerByExchangePage)
