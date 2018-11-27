import * as React from "react";
import { ListItem, ListItemText, Button, Divider } from "@material-ui/core";
import * as moment from 'moment'
import TickerModel from "app/models/TickerModel";

interface TickerRowProps {
    ticker: TickerModel
}

class TickerRow extends React.Component<TickerRowProps>{
    constructor(props: TickerRowProps) {
        super(props);
    }

    render() {
        const ticker = this.props.ticker;
        return (
            <div>
                <ListItem
                    key={ticker.symbol}
                    role={undefined}
                    dense
                    button
                // onClick={() => handleToggle(exchange.name)}
                >
                    <ListItemText
                        primary={ticker.symbol}
                        style={{
                            width: 50
                        }} />
                    <ListItemText
                        primary={ticker.price}
                        style={{
                            width: 50
                        }} />
                    <ListItemText
                        primary={moment(ticker.lastUpdateTime).format('YYYY-MM-DD hh:mm:ss a')}
                        style={{
                            width: 200
                        }} />
                    <ListItemText
                        primary={ticker.exchangeName}

                        style={{
                            width: 50
                        }} />
                    <div style={{
                        width: 100
                    }}>
                        <Button variant="contained" color="primary">
                            View All Exchanges
                        </Button>
                    </div>
                </ListItem>
                <Divider inset component="li" />
            </div>
        )
    }
}

export default TickerRow;