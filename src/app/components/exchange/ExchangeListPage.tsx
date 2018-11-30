import * as React from 'react';
import ExchangeList from './ExchangeList';
import ExchangeModel from 'app/models/ExchangeModel';
import { connect } from 'react-redux';
import socketIOClient from 'socket.io-client';
import { LinearProgress } from '@material-ui/core';

interface ExchangeListPageProps {
    isLoading: boolean,
    exchanges: ExchangeModel[],
    getAllExchanges: (exchanges: ExchangeModel[]) => ExchangeModel[],
    setIsLoadingFlag : (isLoadingFlag: boolean) => void
}

class ExchangeListPage extends React.Component<ExchangeListPageProps> {
    state = {
        isLoading: true,
        exchanges: []
    };

    constructor(props: ExchangeListPageProps) {
        super(props);
    }

    startExchange = (exchange: ExchangeModel) => {
        alert('Started ' + exchange.name);
    }

    stopExchange = (exchange: ExchangeModel) => {
        alert('Stopped ' + exchange.name);
    }

    viewExchangeMarkets = (exchange: ExchangeModel) => {
        alert('View markets for ' + exchange.name);
    }

    componentDidMount = () => {
        let self = this;
        const socket = socketIOClient('http://localhost:2999');
        socket.on('onExchangesReceived', function (data: any) {
            let exchanges: ExchangeModel[] = [];
            data.exchangeList.forEach((exchange: any, index: number, arr: any) => {
                let item = new ExchangeModel(exchange);
                exchanges.push(item);
            });

            self.props.getAllExchanges(exchanges);
        });
    }

    render() {
        const exchanges = this.props.exchanges;
        if (this.props.isLoading) {
            return (
                <div style={{width:600}}>
                    <LinearProgress variant="query" />
                </div>
            )
        }
        return (
            <ExchangeList
                exchangeList={exchanges}
                startExchange={this.startExchange}
                stopExchange={this.stopExchange}
                viewExchangeMarkets={this.viewExchangeMarkets}
            />
        )
    }
}

const mapStateToProps = (state: any) => {
    return {
        isLoading : state.isLoading,
        exchanges: state.exchanges
    };
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        setIsLoadingFlag : (isLoading : boolean) => {
            dispatch({ type: 'SET_IS_LOADING_ACTION', isLoading: isLoading })
        },
        getAllExchanges: (exchanges: ExchangeModel[]) => {
            dispatch({ type: 'GET_ALL_EXCHANGES_ACTION', exchanges: exchanges })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ExchangeListPage);
