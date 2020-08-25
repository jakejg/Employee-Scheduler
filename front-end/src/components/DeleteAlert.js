import React from 'react';
import {useHistory} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {deleteStaffOnAPI} from '../actions/staff';
import {deleteJobOnAPI} from '../actions/jobs';

import {Dialog,
        DialogContent,
        DialogContentText,
        DialogActions,
        Button
    } from '@material-ui/core';

const DeleteAlert = ({ id, type, dialog, setDialog}) => {
    const dispatch = useDispatch()
    const history = useHistory()

    const yes = async () => {
        if (type === "staff") {
            await dispatch(deleteStaffOnAPI(id))
        }
        else {
            await dispatch(deleteJobOnAPI(id))
        }
        history.push('/dashboard')
        
    }
    
    const no = () => {
        setDialog(dialog => false)
    }

    return (
        <Dialog open={dialog} onClose={() => setDialog(dialog => false)} fullWidth={true}>

               <DialogContent>
          <DialogContentText id="alert-dialog-description">
                Are you sure you want to delete this {type}?
          </DialogContentText>
            
        </DialogContent>
        <DialogActions>
          <Button onClick={no} color="primary">
            No
          </Button>
          <Button onClick={yes} color="primary" autoFocus>
            Yes
          </Button>
        </DialogActions>
                 
          </Dialog>
     
        );
}

export default DeleteAlert;
