import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {getStaffFromAPI} from '../actions/staff';
import {loadJobsFromAPI} from '../actions/jobs';
import {Paper, Box, Typography, makeStyles, Grid, List, ListItem, ListItemText, Button } from '@material-ui/core';
import Loading from './Loading';
import { decode } from "jsonwebtoken";
import NotFound from './NotFound';

const Staff = () => {
   const { id } = useParams();
   const dispatch = useDispatch();
   const staff = useSelector(state => state.staff[id])
   const allJobs = useSelector(state => state.jobs);
   const [showPast, setShowPast] = useState(false);
   const [showScheduled, setShowScheduled] = useState(false);
   const [error, setError] = useState();
   const token = useSelector(state => state.application.token)
   const loading = !staff
  
   useEffect(() => {
    const getData = async () => {
        const { comp_id } = decode(token);
        await dispatch(loadJobsFromAPI(comp_id));
        let msg = await dispatch(getStaffFromAPI(id));
        if (msg){
            setError(msg)       
         }
    }
    getData();
    }, [dispatch, id])

    if (error)  return <NotFound msg={error}/>
    if (loading) return <Loading />
   
    return (
            <Grid container>
            <Grid item xs={1} sm={2}>
            </Grid>
            <Grid item xs={10} sm={8}>
                <Paper elevation={5}>
                    <Box m={4} py={2}>
                    <Typography variant='h5' align='center'>{staff.first_name} {staff.last_name}</Typography>
                    <List>
                        <ListItem>
                            <ListItemText >
                                <b>Username:</b> {staff.username}
                            </ListItemText>
                        </ListItem>
                        <ListItem>
                            <ListItemText >
                                <b>Current Wage:</b> ${staff.current_wage }
                            </ListItemText>
                        </ListItem>
                        <ListItem>
                            <ListItemText >
                                <b>Years with "company name": </b> {staff.years_at_company}
                            </ListItemText>
                        </ListItem>
                        <ListItem>
                            <ListItemText>
                                <b>Current Job:</b> {staff.current_job? allJobs[staff.current_job].title: 
                                <Typography>Not currently working</Typography>} 
                            </ListItemText>
                         </ListItem>
                
                        <ListItem onClick={() => setShowScheduled(!showScheduled)}><b>Scheduled Jobs</b></ListItem> 
                        {showScheduled &&
                            <List>
                                {staff.scheduled_jobs.map(id => <ListItem>{allJobs[id].title}</ListItem>)}
                            </List>}
                
                        <ListItem onClick={() => setShowPast(!showPast)}><b>Work History</b></ListItem> 
                        {showPast &&
                            <List>
                                {staff.past_jobs.map(id => <ListItem>{allJobs[id].title}</ListItem>)}
                            </List>}
                        <ListItem>
                            <Button  variant='outlined' color='primary'>Edit Staff</Button>
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

export default Staff;
