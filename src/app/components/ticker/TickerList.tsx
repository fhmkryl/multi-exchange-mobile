import * as React from 'react';
import { List } from '@material-ui/core';
import TickerModel from 'app/models/TickerModel';
import TickerRow from './TickerRow';

interface TickerListProps {
    tickerList: TickerModel[]
}

export default class TickerList extends React.Component<TickerListProps> {
    render() {
        const tickerList = this.props.tickerList;
        return (
            <div style={{ width: 600 }}>
                <List
                    style={{
                        backgroundColor: '#161616'
                    }}
                >
                    {
                        tickerList.map((ticker, index) => {
                            return <TickerRow
                                key={index}
                                index={index}
                                ticker={ticker} />
                        })
                    }
                </List>
            </div>
        )
    }
}