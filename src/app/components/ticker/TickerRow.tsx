import * as React from "react";
import { ListItem, ListItemText, Button, Divider, Typography } from "@material-ui/core";
import * as moment from 'moment'
import TickerModel from "app/models/TickerModel";

interface TickerRowProps {
    index: number,
    ticker: TickerModel
}

class TickerRow extends React.Component<TickerRowProps>{
    constructor(props: TickerRowProps) {
        super(props);
    }

    render() {
        let ticker = this.props.ticker;

        let tickerColor = 'white';
        let percentageColor = 'gray';
        if (ticker.direction === 'Up') {
            tickerColor = '#8AB82F';
            percentageColor = tickerColor;
        }
        if (ticker.direction === 'Down') { 
            tickerColor = '#EA0087'; 
            percentageColor = tickerColor;
        }

        const bySymbolLink = "/#/by_symbol/" + ticker.symbol;

        return (
            <div>
                <ListItem
                    key={ticker.symbol}
                    role={undefined}
                    dense
                    button
                >
                    <ListItemText
                        primary={<Typography style={{ color: tickerColor }}>
                            {ticker.symbol}
                            <br></br>
                            <div style={{fontSize:'xx-small'}}>{moment(ticker.lastUpdateTime).format('hh:mm:ss')}</div>
                        </Typography>}
                        style={{
                            width: 50
                        }} />
                    <ListItemText
                        primary={<Typography style={{ color: tickerColor }}>{ticker.price}</Typography>}
                        style={{
                            width: 50
                        }} />
                    <ListItemText
                        primary=
                        {
                            <Typography style={{ color: tickerColor, fontSize: 'xx-small' }}>
                                H:&nbsp;{ticker.highPrice}
                                <br></br>
                                L:&nbsp;{ticker.lowPrice}
                            </Typography>
                        }
                        style={{
                            width: 50
                        }} />
                    <Button variant="contained" style={{ color: 'white', backgroundColor: percentageColor, marginRight: 10, width:90}}>
                        {ticker.priceChangePercent} %
                        </Button>
                    <Button variant="contained" color="primary" href={bySymbolLink}>
                        Markets
                        </Button>
                </ListItem>
                <Divider style={{ backgroundColor: "#3E3E3E" }} />
            </div>
        )
    }
}


export default TickerRow;