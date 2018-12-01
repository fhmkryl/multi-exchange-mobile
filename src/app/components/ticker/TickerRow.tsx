import * as React from "react";
import { ListItem, ListItemText, Button, Divider, Typography } from "@material-ui/core";
import * as moment from 'moment'
import TickerModel from "app/models/TickerModel";

import { withStyles } from '@material-ui/core/styles';
const styles = (theme: any) => ({
    root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: 'red'
    },
  });

interface TickerRowProps {
    index:number,
    ticker: TickerModel
}

class TickerRow extends React.Component<TickerRowProps>{
    constructor(props: TickerRowProps) {
        super(props);
    }

    render() {
        const ticker = this.props.ticker;
        let tickerColor = 'white';
        if(ticker.direction === 'Up')
            tickerColor = '#8AB82F';
        if(ticker.direction === 'Down')
            tickerColor = '#EA0087';
        
        const bySymbolLink = "/#/by_symbol/"+ticker.symbol;

        return (
            <div>
                <ListItem
                    key={ticker.symbol}
                    role={undefined}
                    dense
                    button
                >
                    <ListItemText
                        primary={<Typography style={{ color: tickerColor }}>{ticker.symbol}</Typography>}
                        style={{
                            width: 50
                        }} />
                    <ListItemText
                        primary={<Typography style={{ color: tickerColor }}>{ticker.price}</Typography>}
                        style={{
                            width: 50
                        }} />
                        <Button variant="contained" color="primary" href={bySymbolLink}>
                            View All Exchanges
                        </Button>
                </ListItem>
                <Divider style={{backgroundColor:"#3E3E3E"}}/>
            </div>
        )
    }
}


export default TickerRow;