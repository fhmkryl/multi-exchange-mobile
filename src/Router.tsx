import * as React from 'react';
import { Route, HashRouter as Router, Switch } from 'react-router-dom';
import ExchangeListPage from 'app/components/Exchange/ExchangeListPage';
import TickerByExchangePage from 'app/components/ticker/TickerByExchangePage';
import { Grid } from '@material-ui/core';
import Header from 'app/components/common/Header';

export const AppRouter: React.StatelessComponent<{}> = () => {
  return (
    <Router>
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
                <Route path="/tickers/:exchange" component={TickerByExchangePage} exact={true} />
              </Grid>
            </Grid>
          </Grid>
        </React.Fragment>
      </Switch>
    </div>
    </Router>
  );
}
