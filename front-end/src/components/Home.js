import React, {useState} from 'react';
import {
    Button,
    Box,
    Dialog,
    DialogTitle
} from '@material-ui/core'
import Alert from '@material-ui/lab/Alert';
import AddForm from './AddForm';
import {register} from '../actions/authentication';
import {login} from '../actions/authentication';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';


const Home = (props) => {
    const [dialog, setDialog] = useState({isOpen: false, type:""});
    const dispatch = useDispatch();
    const {state} = useLocation();
    const history = useHistory();
    
    // show error message if redirected from protected route
    let error;
    if (state)  error = state.error;


    const registerFields = ['Company Name', 'Username', 'Password', 'First Name','Last Name'];
    const loginFields = ['Username', 'Password'];

    const loginDemo = async() => {
        const demoUser = {
            username: "Demo",
            password: "m"
        }
        await dispatch(login(demoUser))
        history.push('/dashboard')
    }

    return (
        <div>
            {error && <Alert severity="warning">You must be logged in as an administrator to view that page</Alert>}
            <Button variant='contained' onClick={()=> setDialog(dialog => ({isOpen: true, type: "Register"}))}>Register your company</Button>
            <Button variant='contained' onClick={()=> setDialog(dialog => ({isOpen: true, type: "Login"}))}>Login</Button>
            <Button variant='contained' onClick={loginDemo}>View Demo Version</Button>

            <Dialog open={dialog.isOpen} onClose={() => setDialog(dialog => ({isOpen: false, type: ""}))} fullWidth={true}>
                <DialogTitle><Box textAlign='center' >Add Company </Box></DialogTitle>
            <AddForm type={dialog.type}
                    fields={dialog.type === 'Register' ? registerFields : loginFields}
                    doOnSubmit={dialog.type === 'Register' ? register : login }
                    redirect='/dashboard'/>
        </Dialog>
        </div>
        );
}

export default Home;
