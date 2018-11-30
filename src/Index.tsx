import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { AppRouter } from './Router';
import { Provider } from 'react-redux';
import store from 'app/store/Store';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core';

const theme = createMuiTheme({
    palette: {
        primary: {
            // light: will be calculated from palette.primary.main, dark: will be calculated
            // from palette.primary.main, contrastText: will be calculated to contrast with
            // palette.primary.main
            light: '#3E3E3E',
            main: '#3E3E3E',
            // dark: will be calculated from palette.secondary.main,
            contrastText: '#ffcc00'
        },
        secondary: {
            main: '#161616'
        },
        // error: will use the default color
    },
    overrides: {
        // Name of the component ⚛️ / style sheet
        MuiButton: {
            // Name of the rule
            root: {
                color: 'white',
                textTransform: 'none'
            }
        },
        MuiListItem: {
            root: {

            }
        }
    }
});

ReactDOM.render(
    <Provider store={store}>
        <MuiThemeProvider theme={theme}>
            <AppRouter />
        </MuiThemeProvider>
    </Provider>
    , document.getElementById('root'));


