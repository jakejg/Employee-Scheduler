import React, {useEffect} from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux';
import ItemList from './ItemList';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
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
    const theme = useTheme();
    const open = useSelector(state => state.application.drawer)
    const token = useSelector(state => state.application.token)
    const dispatch = useDispatch();

    useEffect(() => {
      const getData = async () => {
          const { comp_id } = decode(token);
          dispatch(loadJobsFromAPI(comp_id))
          dispatch(loadStaffFromAPI(comp_id))
      }
      getData();
  }, [dispatch])

    const jobFields = ['Title', 'Start Date','End Date', 'Staff Needed', 'Notes'];
    const staffFields = ['Username', 'First Name','Last Name', 'Current Wage', 'Years At Company']
    return (
      <div className={classes.root}>
            <Sidebar jobFields={jobFields} staffFields={staffFields}/>
        <div className={clsx(classes.content, {
            [classes.contentShift]: open,
          })} >
              <Container>
                    <h1 style={{textAlign: 'center'}}>Dashboard</h1>
                    <Grid container spacing={3} className={classes.drawerHeader} >
                         <Grid item xs>
                             <Paper>
                                <JobList />
                             </Paper>
                         </Grid>
                         <Grid item xs>
                             <Paper>
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
