import React, { useState } from 'react';
import {Box, 
        Typography, 
        makeStyles,
        Dialog,
        DialogTitle,
        IconButton,
        Tooltip,
    } from '@material-ui/core';
import {changeDrawer} from '../actions/application';
import {useDispatch, useSelector } from 'react-redux';
import AddForm from './AddForm';
import {addJobOnAPI} from '../actions/jobs';
import {addStaffOnAPI} from '../actions/staff';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles(() => ({
    here : {
        cursor: 'pointer',
        fontWeight: 'bold'
    }
}))

const EmptyList = ({type}) => {
   
    const classes = useStyles();
    const dispatch = useDispatch();
    const isOpen = useSelector(state => state.application.drawer)
    const [dialog, setDialog] = useState(false);
    console.log(type)
    
    const closeDialog = () => {
        setDialog(!dialog)
    }

    const add = () => {
        setDialog(!dialog)
        if (!isOpen){
            dispatch(changeDrawer())
        }
    }

    const jobFields = ['Title', 'Start Date','End Date', 'Staff Needed', 'Notes'];
    const staffFields = ['Email', 'First Name','Last Name', 'Current Wage', 'Years At Company'];

    return (
        <>
            <Box display="flex"
            flexDirection="column" 
            width='100%' 
            height='100vh' 
            alignItems='center'>
                <Box ><Typography variant='h5'>No {type} added yet</Typography></Box>
                <Box ><Typography>Click <span className={classes.here} onClick={add}>here</span> to add some</Typography></Box>
            </Box>
            <Dialog open={dialog} onClose={closeDialog} fullWidth={true}>
                <DialogTitle>
                  <Box display='flex' justifyContent='flex-end'>
                    <Box width='100%' mt={1} display='flex' justifyContent='center'>
                        <Typography align='center' variant='h6' >Add a new {type}</Typography>
                    </Box>
                      <IconButton onClick={closeDialog}>
                          <Tooltip title="Close Window">
                              <CloseIcon/>
                          </Tooltip>
                      </IconButton>
                  </Box>
                  </DialogTitle>
                <AddForm type={type}
                  fields={type === 'Job' ? jobFields : staffFields}
                  doOnSubmit={type === 'Job' ? addJobOnAPI : addStaffOnAPI} 
                  closeDialog={closeDialog}/>
              </Dialog>
        </>    
        );
}

export default EmptyList;
