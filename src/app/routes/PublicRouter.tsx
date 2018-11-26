import { Route } from 'react-router-dom';
import * as React from 'react';
import Header from 'app/components/common/Header';
import Footer from 'app/components/common/Footer';
import { Component } from 'react';

export const PublicRoute = ({
    ...rest
}) => (
        <Route>
            <React.Fragment>
                <Header />
                <Component />
                <Footer />
            </React.Fragment>
        </Route>
    );

export default PublicRoute;
