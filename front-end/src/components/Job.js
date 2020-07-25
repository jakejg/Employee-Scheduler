import React, {useEffect} from 'react';
import {useParams} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {getJobFromAPI} from '../actions/jobs';
import {loadStaffFromAPI} from '../actions/staff';
import {Paper, Box, Typography, makeStyles, Grid, List, ListItem, ListItemText, Button } from '@material-ui/core';
import Loading from './Loading';

const Job = () => {
   const { id } = useParams();
   const dispatch = useDispatch();
   const job = useSelector(state => state.jobs[id]);
   const allStaff = useSelector(state => state.staff);
   const loading = !job;

   useEffect(() => {
    const getJob = async () => {
        dispatch(loadStaffFromAPI())
        dispatch(getJobFromAPI(id));
    }
    getJob();
}, [dispatch, id])

    if (loading) return <Loading/>

    
    const staffOnJob = job.staff.map(id => {
            if (allStaff[id]) return allStaff[id].first_name
            })
   
    return (
        <Grid container>
            <Grid item xs={1} sm={2}>
            </Grid>
            <Grid item xs={10} sm={8}>
                <Paper elevation={5}>
                    <Box m={4} py={2}>
                    <Typography variant='h5' align='center'>{job.title}</Typography>
                    <List>
                        <ListItem>
                            <ListItemText >
                                <b>Start:</b> {job.start_time.format("dddd, MMMM Do YYYY, h:mm:ss a")}
                            </ListItemText>
                        </ListItem>
                        <ListItem>
                            <ListItemText >
                                <b>End:</b> {job.end_time.format("dddd, MMMM Do YYYY, h:mm:ss a")}
                            </ListItemText>
                        </ListItem>
                        <ListItem>
                            <ListItemText >
                                <b>Staff Needed:</b> {job.staff_needed}
                            </ListItemText>
                        </ListItem>
                        <ListItem>
                            <ListItemText>
                                <b>Staff:</b> {job.staff ? staffOnJob : 
                                <Typography>None</Typography>}
                            </ListItemText>
                         </ListItem>
                         <ListItem>
                            <ListItemText >
                                <b>Notes:</b> {job.notes}
                            </ListItemText>
                        </ListItem>
                        <ListItem>
                            <b>Total Staffing Cost:</b> 
                            {/* {getStaffingCost(staffOnJob)} */}
                        </ListItem>
                        <ListItem>
                            <Button  variant='outlined' color='primary'>Edit Job</Button>
                        </ListItem>
                        
                    </List>
                    
                    </Box>
                </Paper>
                   
            </Grid>
            <Grid item xs={1} sm={2}>
            </Grid>
        </Grid>
        );
}

export default Job;
