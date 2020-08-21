import React from 'react';
import AddForm from './AddForm';
import {
    Typography,
    IconButton,
    Tooltip,
    Box,
    Dialog,
    DialogTitle
} from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close';
import {register} from '../actions/authentication';
import {login} from '../actions/authentication';

const PopOver = ({dialog, setDialog}) => {
    const registerFields = ['Company Name', 'First Name','Last Name', 'Email', 'Username', 'Password',];
    const loginFields = ['Username', 'Password'];

    const closeDialog = () => {
        setDialog(dialog => ({isOpen: false, type: ""}))
    }

    return (
        <Dialog open={dialog.isOpen} onClose={() => setDialog(dialog => ({isOpen: false, type: ""}))} fullWidth={true}>
            <DialogTitle>
            <Box display='flex' justifyContent='flex-end'>
                <Box width='100%' mt={1} display='flex' justifyContent='center'>
                    <Typography align='center' variant='h6' >{dialog.type}</Typography>
                </Box>
                    <IconButton onClick={closeDialog}>
                            <Tooltip title="Close Window">
                                <CloseIcon/>
                            </Tooltip>
                    </IconButton>
            </Box>     
            </DialogTitle>
                <AddForm type={dialog.type}
                fields={dialog.type === 'Register' ? registerFields : loginFields}
                doOnSubmit={dialog.type === 'Register' ? register : login }
                redirect='/dashboard'
                closeDialog={closeDialog}
                />
        </Dialog>
        );
}

export default PopOver;
