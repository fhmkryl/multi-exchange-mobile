import * as React from "react";
import { ListItem, ListItemText, Button, Divider, Typography } from "@material-ui/core";
import * as moment from 'moment'
import TickerModel from "app/models/TickerModel";
import { TickerType } from "app/models/TickerType";

interface TickerRowProps {
    index: number,
    tickerType: TickerType,
    ticker: TickerModel
}

class TickerRow extends React.Component<TickerRowProps>{
    constructor(props: TickerRowProps) {
        super(props);
    }

    render() {
        const { index, tickerType, ticker } = this.props;

        let mainText = ticker.symbol;
        if (tickerType === TickerType.BySymbol) {
            mainText = ticker.exchangeName;
        }

        let tickerColor = 'white';
        let percentageColor = 'gray';

        if (ticker.direction === 'Up') {
            tickerColor = '#8AB82F';
        }
        if (ticker.direction === 'Down') {
            tickerColor = '#EA0087';
        }
        if (ticker.priceChangePercent > 0) {
            percentageColor = '#8AB82F';
        }
        if (ticker.priceChangePercent < 0) {
            percentageColor = '#EA0087';
        }

        let marketsLink = "/#/by_symbol/" + ticker.symbol;
        if (tickerType === TickerType.BySymbol) {
            marketsLink = "/#/by_exchange/" + ticker.exchangeName;
        }

        return (
            <div>
                <ListItem
                    key={ticker.symbol}
                    role={undefined}
                    dense
                    button
                >
                    <ListItemText
                            primary = 
                            {
                                <Typography style={{color:'white'}}>
                                    #{index + 1}
                                </Typography>
                            }
                            style={{
                                marginLeft:-20,
                                marginRight:-60
                            }}
                        />
                    <ListItemText
                        primary={<Typography style={{ color: tickerColor }}>
                            {mainText}
                            <br></br>
                            {/* <div style={{fontSize:'xx-small'}}>{moment(ticker.lastUpdateTime).format('hh:mm:ss')}</div> */}
                            <div style={{ color: 'white', fontSize: '10px' }}>Vol {ticker.volume.toLocaleString()}</div>
                        </Typography>}
                        style={{
                            width: 50
                        }} />
                    <ListItemText
                        primary=
                        {
                            <Typography style={{ color: tickerColor }}>
                                {ticker.price.toLocaleString()}
                                <br></br>
                                <div style={{ color: 'white', fontSize: '10px' }}>${ticker.priceInDollar.toLocaleString()}</div>
                            </Typography>
                        }
                        style={{
                            width: 50
                        }} />
                    <ListItemText
                        primary=
                        {
                            <Typography style={{ color: 'white', fontSize: '10px' }}>
                                H&nbsp;{ticker.highPrice.toLocaleString()}
                                <br></br>
                                L&nbsp;{ticker.lowPrice.toLocaleString()}
                            </Typography>
                        }
                        style={{
                            width: 50
                        }} />
                    <Button variant="contained" style={{ color: 'white', backgroundColor: percentageColor, marginRight: 10, width: 90 }}>
                        {ticker.priceChangePercent.toLocaleString()} %
                        </Button>
                    <Button variant="contained" color="primary" href={marketsLink}>
                        Markets
                        </Button>
                </ListItem>
                <Divider style={{ backgroundColor: "#3E3E3E" }} />
            </div>
        )
    }
}


export default TickerRow;