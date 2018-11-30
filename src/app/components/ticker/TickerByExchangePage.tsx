import * as React from 'react';
import { connect } from 'react-redux';
import socketIOClient from 'socket.io-client';
import TickerModel from 'app/models/TickerModel';
import TickerList from './TickerList';
import { TextField, LinearProgress, SnackbarContent, Snackbar, ListItem, ListItemText, Typography } from '@material-ui/core';
import { RouteProps } from 'react-router';

interface TickerByExchangePageProps extends RouteProps  {
    isLoading: boolean,
    filterText: string,
    exchangeName: string,
    tickersByExchange: TickerModel[],
    getTickersByExchange : (tickers:TickerModel[]) => TickerModel[],
    setFilterTickerByExchange: (filterText:string) => void,
    setIsLoadingFlag : (isLoadingFlag: boolean) => void
}

class TickerByExchangePage extends React.Component<TickerByExchangePageProps> {
    state = {
        isLoading: true,
        filterText: '',
        exchangeName: 'Binance',
        tickersByExchange: []
    };

    constructor(props: TickerByExchangePageProps) {
        super(props);

        console.log(this.props);
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
        this.props.setIsLoadingFlag(true);

        this.props.setFilterTickerByExchange(event.target.value);
    };

    render() {
        const tickers = this.props.tickersByExchange;
        
        let loaderPanel = <div></div>;
        let tickersPanel = <div></div>;
        if(this.props.isLoading){
            loaderPanel = <div style={{width:600}}>
                            <LinearProgress variant="query" />
                        </div>
        }
        else{
            if(tickers.length > 0){
                tickersPanel = <TickerList tickerList = {tickers} />
            }
            else{
                tickersPanel = <ListItem 
                                    style={{width:600,backgroundColor:'black'}}
                                    role={undefined}
                                    dense
                                    button
                                >
                                    <ListItemText
                                        primary={<Typography style={{ color: 'green' }}>No data available</Typography>}
                                        style={{
                                            width: 50
                                        }} />
                                </ListItem>
            }
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
                    style={{width:600}}
                    onChange = {this.onSearchChangeHandler()}
                    />
                <div>
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
        filterTickersByExchangeText : state.filterTickersByExchangeText,
        tickersByExchange: state.tickersByExchange 
    };
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        setIsLoadingFlag : (isLoading : boolean) => {
            dispatch({ type: 'SET_IS_LOADING_ACTION', isLoading: isLoading })
        },
        getTickersByExchange : (tickers : TickerModel[]) => {
            dispatch({ type: 'GET_TICKERS_BY_EXCHANGE_ACTION', tickersByExchange: tickers })
        },
        setFilterTickerByExchange:(filterText: string) => {
            dispatch({ type: 'SET_FILTER_TICKERS_BY_EXCHANGE_ACTION', filterTickersByExchangeText: filterText })
        }

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TickerByExchangePage)
