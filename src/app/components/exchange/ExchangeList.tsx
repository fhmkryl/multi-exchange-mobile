import ExchangeViewModel from 'app/models/ExchangeModel';
import * as React from 'react';
import { List } from '@material-ui/core';
import ExchangeRow from './ExchangeRow';

interface ExchangeListProps {
    exchangeList: ExchangeViewModel[],
    startExchange: (exchange: ExchangeViewModel) => void,
    stopExchange: (exchange: ExchangeViewModel) => void,
    viewExchangeMarkets: (exchange: ExchangeViewModel) => void
}

export default class ExchangeList extends React.Component<ExchangeListProps> {
    render() {
        const exchangeList = this.props.exchangeList;
        return (
            <div style={{width:800}}>
                <List>
                    {
                        exchangeList.map((exchange, index) => {
                            return <ExchangeRow 
                                        key={index}
                                        exchange={exchange}  
                                        startExchange={this.props.startExchange}
                                        stopExchange={this.props.stopExchange}
                                        viewExchangeMarkets={this.props.viewExchangeMarkets}/>
                        })
                    }
                </List>
            </div>
        )
    }
}
