import React, {useState} from 'react';
import {
    Button,
    Box,
    Dialog,
    DialogTitle
} from '@material-ui/core'
import AddForm from './AddForm';
import {register} from '../actions/authentication';
import {login} from '../actions/authentication';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';


const Home = () => {
    const [dialog, setDialog] = useState({isOpen: false, type:""}) 
    const dispatch = useDispatch();
    const history = useHistory();


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
            <Button variant='contained' onClick={()=> setDialog(dialog => ({isOpen: true, type: "Register"}))}>Register your company</Button>
            <Button variant='contained' onClick={()=> setDialog(dialog => ({isOpen: true, type: "Login"}))}>Login</Button>
            <Button variant='contained' onClick={loginDemo}>View Demo Version</Button>

            <Dialog open={dialog.isOpen} onClose={() => setDialog(dialog => ({isOpen: false, type: ""}))} fullWidth={true}>
                <DialogTitle><Box textAlign='center' >Add Company </Box></DialogTitle>
            <AddForm type={dialog.type}
                    fields={dialog.type === 'Register' ? registerFields : loginFields}
                    addToDb={dialog.type === 'Register' ? register : login }
                    redirect='/dashboard'/>
        </Dialog>
        </div>
        );
}

export default Home;
