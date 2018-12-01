import * as React from "react";
import ExchangeModel from "app/models/ExchangeModel";
import { ListItem, ListItemText, Button, Divider, Typography } from "@material-ui/core";
import * as moment from 'moment'

interface ExchangeRowProps {
    exchange: ExchangeModel,
    startExchange: (exchange: ExchangeModel) => void,
    stopExchange: (exchange: ExchangeModel) => void,
    viewExchangeMarkets: (exchange: ExchangeModel) => void,
}

class ExchangeRow extends React.Component<ExchangeRowProps>{
    constructor(props: ExchangeRowProps) {
        super(props);
    }

    render() {
        const exchange = this.props.exchange;
        let exchangeColor = '#EA0087';
        if(exchange.status === 'Running')
            exchangeColor = '#8AB82F';

        const byExchangeLink = "/#/by_exchange/"+exchange.name;
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
                        primary={<Typography style={{ color: exchangeColor }}>{exchange.name}</Typography>}
                        style={{
                            width: 50
                        }} />
                    <ListItemText
                        primary={<Typography style={{ color: exchangeColor }}>{moment(exchange.serverTime).format('YYYY-MM-DD hh:mm:ss a')}</Typography>}
                        style={{
                            width: 200
                        }} />
                    <ListItemText
                        primary={<Typography style={{ color: exchangeColor }}>{exchange.status}</Typography>}
                        style={{
                            width: 50
                        }} />
                    <div style={{
                        width: 100
                    }}>
                        <Button variant="contained" color="primary" href={byExchangeLink}>
                            Markets
                        </Button>
                    </div>
                </ListItem>
                <Divider style={{backgroundColor:"#3E3E3E"}}/>
            </div>
        )
    }
}

export default ExchangeRow;