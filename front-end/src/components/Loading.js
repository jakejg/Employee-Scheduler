import React from 'react';
import {Box, Typography, CircularProgress} from '@material-ui/core';


const Loading = () => {

    return (<Box display="flex" 
                width='100%' 
                height='100vh' 
                alignItems="center"
                justifyContent="center">
                <CircularProgress />
                    <Typography variant='h3'>Loading</Typography>
             </Box>)
}

export default Loading;
