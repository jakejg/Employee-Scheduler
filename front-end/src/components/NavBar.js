import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import PermContactCalendarIcon from '@material-ui/icons/PermContactCalendar';
import MenuIcon from '@material-ui/icons/Menu';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import {changeDrawer} from '../actions/application';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import {LOG_OUT} from '../actions/actionTypes';
import {addOrRemoveToken} from '../actions/authentication'
import PopOver from './PopOver';


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
    backgroundColor: 'purple'
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
    },
    cursor: 'pointer',
    fontSize: '16px'
  },
  title: {
    flexGrow: 1,
    marginLeft: '10px'
  },
  dashboard: {
    marginRight: '20px'
  }

}));

const NavBar = ({ onDashboard }) => {
    const classes = useStyles();
    const open = useSelector(state => state.application.drawer);
    const loggedIn = useSelector(state => state.application.token)
    const [dialog, setDialog] = useState({isOpen: false, type:""});
    const dispatch = useDispatch();
    const history = useHistory();
    
    // show full nav bar if not on the dashboard
      if (window.location.pathname !== '/dashboard' && open) {
        dispatch(changeDrawer());
      }


    const handleDrawerOpen = () => {
      dispatch(changeDrawer())
    };

    const logout = () => {
    
        dispatch(addOrRemoveToken(null))
        dispatch({type: LOG_OUT})
        
        history.push('/')
    }
    const loggedOutView = <>
                            
                            <PermContactCalendarIcon fontSize='large' />
                            
                              <Typography variant="h6" className={classes.title}>
                                Employee Scheduler 
                              </Typography>
                              <Typography onClick={()=> setDialog(dialog => ({isOpen: true, type: "Login"}))} className={classes.link}>Login</Typography>
                          
                            </>
    const loggedInView = <>
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
                            < PermContactCalendarIcon fontSize="large" />
                            <Typography variant="h6" className={classes.title}>
                                Employee Scheduler
                            </Typography>
                            <IconButton color='inherit'><DashboardIcon/></IconButton>
                            <Typography  className={`${classes.link} ${classes.dashboard}`} ><NavLink className={classes.link} to='/dashboard'>Dashboard </NavLink></Typography>
                            <IconButton color='inherit'><ExitToAppIcon/></IconButton>
                            <Typography onClick={logout} className={classes.link}>Logout</Typography>
                        </>



    return (
        <div>
        <AppBar
            position="sticky"
            className={clsx(classes.appBar, {
            [classes.appBarShift]: open,
        })}
        > 
        <Toolbar>
            {loggedIn ? loggedInView: loggedOutView}
        </Toolbar>
            
          </AppBar>
          <PopOver dialog={dialog} setDialog={setDialog} />
        </div>
        )
}
  
export default NavBar;
