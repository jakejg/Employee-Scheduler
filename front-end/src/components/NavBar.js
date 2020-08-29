import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import {AppBar,
        Box,
        Toolbar,
        Typography,
        Menu,
        MenuItem} from '@material-ui/core';
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
import {drawerWidth} from '../config';
import MoreIcon from '@material-ui/icons/MoreVert';

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
      color: 'grey',
    },
    cursor: 'pointer',
    fontSize: '16px'
  },
  iconLink :  {
    textDecoration: 'none',
    fontWeight: 'bold',
    color: 'white',
    cursor: 'pointer',
    fontSize: '16px'
  },
  menuLink : {
    textDecoration: 'none',
    fontWeight: 'bold',
    color: 'black',
    cursor: 'pointer',
    fontSize: '16px'
  },
  title: {
    flexGrow: 1,
    marginLeft: '10px'
  },
  dashboard: {
    marginRight: '20px',
    fontWeight: 'bold',
  }

}));

const NavBar = () => {
    const classes = useStyles();
    const open = useSelector(state => state.application.drawer);
    const loggedIn = useSelector(state => state.application.token)
    const [dialog, setDialog] = useState({isOpen: false, type:""});
    const [anchorEl, setAnchorEl] = useState(null);
    const dispatch = useDispatch();
    const history = useHistory();

    let showSideBar = true;
    // don't show option to open side bar if on home page
    if (window.location.pathname === '/'){
      showSideBar = false;
    }

    const handleDrawerOpen = () => {
      dispatch(changeDrawer())
    };

    const openMenu = (e) => {
      setAnchorEl(e.currentTarget)
    }

    const logout = () => {
    
        dispatch(addOrRemoveToken(null))
        dispatch({type: LOG_OUT})
        
        history.push('/')
    }

    const smallScreenView =  <>     
                            <IconButton onClick={openMenu} color='inherit'>
                                <MoreIcon />
                            </IconButton>
                            <Menu open={Boolean(anchorEl)} anchorEl={anchorEl} onClose={() => setAnchorEl(null)}>
                              <MenuItem>
                                <NavLink className={classes.menuLink} to='/dashboard'>Dashboard</NavLink> 
                              </MenuItem>
                              <MenuItem>
                                <Typography className={classes.menuLink} onClick={logout}>Logout</Typography> 
                              </MenuItem>
                            </Menu>
                          </>
    const standardScreenView =  <>
                                  <Box display='flex' alignItems='center'>
                                    <NavLink className={classes.iconLink} to='/dashboard'>
                                      <IconButton color='inherit'><DashboardIcon/></IconButton>
                                    </NavLink> 
                                    <Typography className={`${classes.link} ${classes.dashboard}`}>
                                    <NavLink className={classes.link} to='/dashboard'>Dashboard</NavLink> 
                                    </Typography>
                                  </Box>
                                  <Box display='flex' alignItems='center'>
                                    <IconButton  onClick={logout} color='inherit'><ExitToAppIcon/></IconButton>
                                    <Typography onClick={logout} className={classes.link}>Logout</Typography>
                                  </Box>
                                </>
    const loggedOutView = <>
                            
                            <PermContactCalendarIcon fontSize='large' />
                            
                              <Typography variant="h6" className={classes.title}>
                                Employee Scheduler 
                              </Typography>
                              <Typography onClick={()=> setDialog(dialog => ({isOpen: true, type: "Login"}))} className={classes.link}>Login</Typography>
                          
                            </>
    const loggedInView = <>
                            {showSideBar && <IconButton
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
                            <Box display={{xs:'none', sm: 'flex'}}>
                              {standardScreenView}
                            </Box>
                            <Box display={{xs:'block', sm: 'none'}}>
                              {smallScreenView}
                            </Box>
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
