import React from 'react';
import Routes from './Routes';
import {
    makeStyles
} from '@material-ui/core';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

const theme = createMuiTheme({
  typography: {
    fontFamily: [
        'Roboto,Open Sans,Helvetica,Arial'].join(','),
  }
});

const useStyles = makeStyles(() => ({
    body: {
        height:'100vh',
        backgroundColor: '#F6F5F0'
    }
}))

const App = () => {
    const classes = useStyles()

    return (
        <ThemeProvider theme={theme}>
            <div className={classes.body}>
                <Routes />      
            </div>
        </ThemeProvider>
        );
}

export default App;
