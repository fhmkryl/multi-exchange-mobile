import * as React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Header from 'app/components/common/Header';
import { Grid } from '@material-ui/core';
import ExchangeListPage from 'app/components/Exchange/ExchangeListPage';
import TickerByExchangePage from 'app/components/ticker/TickerByExchangePage';

const AppRouter = () => (
  <BrowserRouter>
    <div>
      <Switch>
        <React.Fragment>
          <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justify="center"
          >
            <Grid>
              <Grid xs={12}>
                <Header />
              </Grid>
              <Grid item xs={1}>
                <Route path="/" component={ExchangeListPage} exact={true} />
                <Route path="/exchanges" component={ExchangeListPage} exact={true} />
                <Route path="/tickers" component={TickerByExchangePage} exact={true} />
              </Grid>
            </Grid>
          </Grid>
        </React.Fragment>
      </Switch>
    </div>
  </BrowserRouter>
);

export default AppRouter;