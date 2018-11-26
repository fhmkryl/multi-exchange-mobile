import * as React from 'react';
import ExchangeList from './ExchangeList';
import ExchangeViewModel from 'app/models/ExchangeModel';
import { connect } from 'react-redux';
import socketIOClient from 'socket.io-client';

interface ExchangeListPageProps {
    getAllExchanges: (exchanges: ExchangeViewModel[]) => ExchangeViewModel[],
    exchanges: ExchangeViewModel[]
}

class ExchangeListPageSocketIo extends React.Component<ExchangeListPageProps> {
    state = {
        exchanges: []
    };

    constructor(props: ExchangeListPageProps) {
        super(props);
    }

    startExchange = (exchange: ExchangeViewModel) => {
        alert('Started ' + exchange.name);
    }

    stopExchange = (exchange: ExchangeViewModel) => {
        alert('Stopped ' + exchange.name);
    }

    viewExchangeMarkets = (exchange: ExchangeViewModel) => {
        alert('View markets for ' + exchange.name);
    }

    componentDidMount = () => {
        let self = this;
        const socket = socketIOClient('http://localhost:2999');
        console.log(socket);
        socket.on('onExchangesReceived', function(data: any) {
            console.log(data);
            let exchanges: ExchangeViewModel[] = [];
                data.exchangeList.forEach((exchange: any, index: number, arr: any) => {
                    let item = new ExchangeViewModel(exchange);
                    exchanges.push(item);
                });

            self.props.getAllExchanges(exchanges);
        });
    }

    render() {
        const exchanges = this.props.exchanges;
        if (exchanges && exchanges.length > 0) {
            return (<ExchangeList
                exchangeList={exchanges}
                startExchange={this.startExchange}
                stopExchange={this.stopExchange}
                viewExchangeMarkets={this.viewExchangeMarkets}
            />)
        }
        return (
            <div>Loading...</div>
        )
    }
}

const mapStateToProps = (state: any) => {
    return { exchanges: state.exchanges };
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        getAllExchanges: (exchanges: ExchangeViewModel[]) => {
            dispatch({ type: 'GET_ALL_EXCHANGES_ACTION', exchanges: exchanges })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ExchangeListPageSocketIo)
