import React, {useEffect} from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux';
import {Container,
        Grid,
        Paper,
        Typography,
        Box } from '@material-ui/core';
import Sidebar from './Sidebar';
import JobList from './JobList';
import StaffList from './StaffList';
import { loadJobsFromAPI } from '../actions/jobs';
import { loadStaffFromAPI } from '../actions/staff';
import { decode } from "jsonwebtoken";

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
    const open = useSelector(state => state.application.drawer)
    const token = useSelector(state => state.application.token)
    const dispatch = useDispatch();

    useEffect(() => {
      const getData = async () => {
          const { comp_id } = decode(token);
          dispatch(loadJobsFromAPI(comp_id));
          dispatch(loadStaffFromAPI(comp_id));
      }
      getData();
  }, [dispatch, token])

    const jobFields = ['Title', 'Start Date','End Date', 'Staff Needed', 'Notes'];
    const staffFields = ['Email', 'First Name','Last Name', 'Current Wage', 'Years At Company'];
    
    return (
      <div className={classes.root}>
            <Sidebar jobFields={jobFields} staffFields={staffFields}/>
        <div className={clsx(classes.content, {
            [classes.contentShift]: open,
          })} >
              <Container>
                    <Box mb={3} mx={{sm:'auto'}}><Paper elevation={3}><Typography variant='h3' align='center'>Dashboard</Typography></Paper></Box>
                    <Grid container spacing={3} className={classes.drawerHeader} >
                         <Grid item xs>
                             <Paper elevation={3}>
                                <JobList />
                             </Paper >
                         </Grid>
                         <Grid item xs>
                             <Paper elevation={3}>
                                <StaffList />
                             </Paper>
                         </Grid>

                    </Grid>
               </Container>
        </div>
      
      </div>
    );
}

export default Dashboard;
