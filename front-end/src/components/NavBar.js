import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import {changeDrawer} from '../actions/drawer';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import {LOG_OUT} from '../actions/actionTypes';


const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  link: {
    textDecoration: 'none',
    fontWeight: 'bold',
    color: 'white',
    '&:hover': {
      color: 'grey'
    }
  },
  title: {
    flexGrow: 1,
  },
 
 
}));

const NavBar = ({onDashboard=false}) => {
    const classes = useStyles();
    const open = useSelector(state => state.application.drawer)
    const dispatch = useDispatch();
    const history = useHistory();

    // show full nav bar if not on the dashboard
    if (window.location.pathname !== '/dashboard' && open) {
      dispatch(changeDrawer())
    }

    const handleDrawerOpen = () => {
      dispatch(changeDrawer())
    };

    const logout = () => {
        dispatch({type: LOG_OUT})
        localStorage.removeItem('token');
        history.push('/')
    }


    return (
        <div>
        <AppBar
            position="sticky"
            className={clsx(classes.appBar, {
            [classes.appBarShift]: open,
        })}
        > 
            <Toolbar>
                {onDashboard &&
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  onClick={handleDrawerOpen}
                  edge="start"
                  className={clsx(classes.menuButton, open && classes.hide)}
                >
                  <MenuIcon />
                </IconButton>}
                <Typography variant="h6" className={classes.title}>
                    Employee Scheduler
                </Typography>
                <Box  className={classes.link} ><NavLink className={classes.link} to='/dashboard'>Dashboard </NavLink></Box>
                <Box onClick={logout} className={classes.link}>Logout</Box>
            </Toolbar>
          </AppBar>
        </div>
        )
}
  
export default NavBar;
