import React, {useState} from 'react';
import dashboard from '../images/dashboard.png';
import {
    Button,
    Box,
    Grid,
    Paper,
    List,
    ListItem,
    makeStyles
} from '@material-ui/core'
import Alert from '@material-ui/lab/Alert';
import PopOver from './PopOver';
import {login} from '../actions/authentication';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';

const useStyles = makeStyles(() => ({
    img : {
        maxWidth: '100%',
        height: 'auto',
        display: 'block'
    },

    main : {
        paddingBottom: '0px',
        fontSize: '50px',
        fontWeight: '700'
    },

    background: {
        backgroundColor: '#f6efe8'
    },

    second: {
        paddingTop: '0px',
        fontSize: '20px',
        fontWeight: '400'
    }
   
}))

const Home = () => {
    const [dialog, setDialog] = useState({isOpen: false, type:""});
    const dispatch = useDispatch();
    const {state} = useLocation();
    const history = useHistory();
    const classes = useStyles();

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
      
        <Paper elevation={3} className={classes.background}>
            <Grid container alignItems='center'>
                <Grid item xs={12} sm={6}>
                    <Box m={3}>
                        <List>
                            <ListItem className={classes.main}>
                                Organize your team members
                            </ListItem>
                        </List>
                        <List>
                            <ListItem className={classes.second}>
                            Manage contracts, compare schedules, assign jobs, and send notifications to employees
                            </ListItem>
                        </List>
                        <List>
                            <ListItem>
                                <Button variant='contained' onClick={()=> setDialog(dialog => ({isOpen: true, type: "Register"}))}>Register your company</Button>
                            </ListItem>
                            <ListItem>
                                <Button variant='contained' onClick={loginDemo}>View Demo Version</Button>
                            </ListItem>
                        </List>
                    </Box>    
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Box  m={3}>
                        <img src={dashboard} className={classes.img} alt='Dashboard screenshot'/>
                    </Box>
 
                </Grid>

            </Grid>
        </Paper>
        <PopOver dialog={dialog} setDialog={setDialog} />
        </div>
        );
}

export default Home;
