import * as React from 'react';
import { List } from '@material-ui/core';
import TickerModel from 'app/models/TickerModel';
import TickerRow from './TickerRow';
import { TickerType } from 'app/models/TickerType';

interface TickerListProps {
    tickerType: TickerType,
    tickerList: TickerModel[]
}

export default class TickerList extends React.Component<TickerListProps> {
    render() {
        const { tickerType, tickerList } = this.props;
        return (
            <div style={{
                width: 600
            }}>
                <List
                    style={{
                        backgroundColor: '#161616'
                    }}>
                    {tickerList.map((ticker, index) => {
                        return <TickerRow key={index} tickerType={tickerType} index={index} ticker={ticker} />
                    })
                    }
                </List>
            </div>
        )
    }
}