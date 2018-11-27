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
            <div style={{ width: 800 }}>
                <List>
                    {
                        tickerList.map((ticker, index) => {
                            return <TickerRow
                                key={index}
                                ticker={ticker} />
                        })
                    }
                </List>
            </div>
        )
    }
}