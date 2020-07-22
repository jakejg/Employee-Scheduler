import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {changeDrawer} from '../actions/drawer';
import { useSelector, useDispatch } from 'react-redux';
import ItemList from './ItemList';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Dialog from '@material-ui/core/Dialog';
import Sidebar from './Sidebar';
import AddForm from './AddForm'
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },

  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

const Dashboard = () => {

      const classes = useStyles();
      const theme = useTheme();
      const open = useSelector(state => state.drawer)
      const dispatch = useDispatch();
    
      const handleDrawerOpen = () => {
        dispatch(changeDrawer())
      };
    
      const handleDrawerClose = () => {
        dispatch(changeDrawer())
      };
    
      return (
        <div className={classes.root}>
                      <Sidebar />
          <div className={clsx(classes.content, {
              [classes.contentShift]: open,
            })} >
                <Container>
                <h1 style={{textAlign: 'center'}}>Dashboard</h1>
                <Grid container spacing={3} className={classes.drawerHeader} >
                    <Grid item xs>
                        <Paper>
                            <ItemList type='jobs' name='title' />
                        </Paper>
                    </Grid>
                    <Grid item xs>
                        <Paper>
                            <ItemList type='staff' name='first_name' />
                        </Paper>
                    </Grid>
                   
                 </Grid>
                 </Container>
          </div>
          
        </div>
      );
}

export default Dashboard;
