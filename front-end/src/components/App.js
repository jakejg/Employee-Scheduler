import React from 'react';
import Routes from './Routes';
import {
    makeStyles
} from '@material-ui/core';

const useStyles = makeStyles(() => ({
    body: {
        fontFamily: 'Slack-Larsseit,"Helvetica Neue",Helvetica,"Segoe UI",Tahoma,Arial,sans-serif',
        height:'100vh',
        backgroundColor: '#F6F5F0'
    }
}))

const App = () => {
    const classes = useStyles()

    return (
        <div className={classes.body}>
            <Routes />      
        </div>
        );
}

export default App;
