import * as React from "react";
import ExchangeViewModel from "app/models/ExchangeModel";
import { ListItem, ListItemText, Button, Divider } from "@material-ui/core";
import * as moment from 'moment'

interface ExchangeRowProps {
    exchange: ExchangeViewModel,
    startExchange: (exchange: ExchangeViewModel) => void,
    stopExchange: (exchange: ExchangeViewModel) => void,
    viewExchangeMarkets: (exchange: ExchangeViewModel) => void,
}

class ExchangeRow extends React.Component<ExchangeRowProps>{
    constructor(props: ExchangeRowProps) {
        super(props);
    }

    render() {
        const exchange = this.props.exchange;
        return (
            <div>
                <ListItem
                    key={exchange.name}
                    role={undefined}
                    dense
                    button
                    // onClick={() => handleToggle(exchange.name)}
                    >
                    <ListItemText
                        primary={exchange.name}
                        style={{
                            width: 50
                        }} />
                    <ListItemText
                        primary={moment(exchange.serverTime).format('YYYY-MM-DD hh:mm:ss a')}
                        style={{
                            width: 200
                        }} />
                    <ListItemText
                        primary={exchange.status}

                        style={{
                            width: 50
                        }} />
                    <div style={{
                        width: 100
                    }}>
                        <Button variant="contained" color="primary" onClick={() => this.props.startExchange(exchange)}>
                            Start
                </Button>
                    </div>
                    <div style={{
                        width: 100
                    }}>
                        <Button variant="contained" color="primary" onClick={() => this.props.stopExchange(exchange)}>
                            Stop
                </Button>
                    </div>
                    <div style={{
                        width: 100
                    }}>
                        <Button variant="contained" color="primary" onClick={() => this.props.viewExchangeMarkets(exchange)}>
                            Markets
                </Button>
                    </div>
                </ListItem>
                <Divider inset component="li" />
            </div>
        )
    }
}

export default ExchangeRow;