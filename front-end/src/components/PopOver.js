import React from 'react';
import AddForm from './AddForm';
import {
    Button,
    Box,
    Dialog,
    DialogTitle
} from '@material-ui/core'
import {register} from '../actions/authentication';
import {login} from '../actions/authentication';

const PopOver = ({dialog, setDialog}) => {

    const registerFields = ['Company Name', 'Username', 'Password', 'First Name','Last Name'];
    const loginFields = ['Username', 'Password'];

    return (
        <Dialog open={dialog.isOpen} onClose={() => setDialog(dialog => ({isOpen: false, type: ""}))} fullWidth={true}>
            <DialogTitle><Box textAlign='center' >{dialog.type}</Box></DialogTitle>
                <AddForm type={dialog.type}
                fields={dialog.type === 'Register' ? registerFields : loginFields}
                doOnSubmit={dialog.type === 'Register' ? register : login }
                redirect='/dashboard'/>
        </Dialog>
        );
}

export default PopOver;
