import ExchangeList from './ExchangeList';
import ExchangeViewModel from 'app/models/ExchangeModel';
import * as signalR from "@aspnet/signalr";
import { connect } from 'react-redux';
import * as React from 'react';

// interface ExchangeListPageProps {
//     getAllExchanges: (exchanges: ExchangeViewModel[]) => ExchangeViewModel[],
//     exchanges: ExchangeViewModel[]
// }

// interface ExchangeListPageState {
//     exchanges: ExchangeViewModel[]
// }

class ExchangeListPage extends React.Component<any, {}, any> {
    private _hubConnection: signalR.HubConnection;

    constructor(props: any) {
        super(props);

        this.state = {
            exchanges : props.exchanges
        };

        this._hubConnection = new signalR
            .HubConnectionBuilder()
            .withUrl('https://localhost:44316/exchange')
            .configureLogging(signalR.LogLevel.Debug)
            .build();
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
        this.registerOnServerEvents();
        this.startConnection();
    }

    private startConnection() {
        this
            ._hubConnection
            .start()
            .then(() => {
                console.log('Hub connection started');

                // Invoke method
                this
                    ._hubConnection
                    .invoke('SubscribeToExchangeList');
            });
    }

    private registerOnServerEvents(): void {
        this
            ._hubConnection
            .on('onReceivedExchangeList', (response: any) => {
                let exchanges: ExchangeViewModel[] = [];
                response.forEach((exchange: any, index: number, arr: any) => {
                    let item = new ExchangeViewModel(exchange);
                    exchanges.push(item);
                });

                this
                    .props
                    .getAllExchanges(exchanges);
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

export default connect(mapStateToProps, mapDispatchToProps)(ExchangeListPage)
