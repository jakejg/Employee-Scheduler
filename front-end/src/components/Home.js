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
import PopOver from './PopOver';
import {login} from '../actions/authentication';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';


const Home = () => {
    const [dialog, setDialog] = useState({isOpen: false, type:""});
    const dispatch = useDispatch();
    const {state} = useLocation();
    const history = useHistory();

    // show error message if redirected from protected route
    let error;
    if (state)  error = state.error;

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

            <PopOver dialog={dialog} setDialog={setDialog} />
        </div>
        );
}

export default Home;
