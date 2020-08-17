import React from 'react';
import {Box, Typography, makeStyles} from '@material-ui/core';
import {changeDrawer} from '../actions/application';
import {useDispatch } from 'react-redux';

const useStyles = makeStyles(() => ({
    here : {
        cursor: 'pointer',
        fontWeight: 'bold'
    }
}))

const EmptyList = ({type}) => {
    const classes = useStyles();
    const dispatch = useDispatch();

    return (
        <Box display="flex"
        flexDirection="column" 
        width='100%' 
        height='100vh' 
        alignItems='center'>
            <Box ><Typography variant='h5'>No {type} added yet</Typography></Box>
            <Box ><Typography>Click <span className={classes.here} onClick={() => dispatch(changeDrawer())}>here</span> to add some</Typography></Box>
     </Box>
        );
}

export default EmptyList;
