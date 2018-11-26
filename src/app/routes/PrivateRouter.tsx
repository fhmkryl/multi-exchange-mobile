import {connect} from 'react-redux';
import {Route} from 'react-router-dom';
import * as React from 'react';
import Header from 'app/components/common/Header';
import Footer from 'app/components/common/Footer';

export const PrivateRoute = ({
  ...rest
}) => (
  <Route
    {...rest}
    component={(props : any) => (
    <div>
      <Header/>
      <div className="bodyComponent"></div>
      <Footer/>
    </div>
  )}/>
);

export default connect()(PrivateRoute);
