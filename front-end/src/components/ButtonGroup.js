import React from 'react';
import {
    Box,
    makeStyles
} from '@material-ui/core';

const useStyles = makeStyles(() => ({
    box: {
        display: 'flex',
        width: '100%',
        justifyContent: 'space-around'
    }
}))

const ButtonGroup = ({ children }) => {
    const classes = useStyles();

    return (
        <Box className={classes.box}>
            {children}
        </Box>
        );
}

export default ButtonGroup;
