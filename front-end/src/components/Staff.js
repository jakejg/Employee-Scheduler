import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {getStaffFromAPI} from '../actions/staff';
import {loadJobsFromAPI} from '../actions/jobs';
import {Paper, Chip, Box, Typography, makeStyles, Grid, List, ListItem, ListItemText, ListItemIcon, Button, Collapse } from '@material-ui/core';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import Loading from './Loading';
import { decode } from "jsonwebtoken";
import NotFound from './NotFound';
import { CompanyAPI } from '../helpers/CompanyApi';

const Staff = () => {
   const { id } = useParams();
   const dispatch = useDispatch();
   const staff = useSelector(state => state.staff[id])
   const allJobs = useSelector(state => state.jobs);
   const [showPast, setShowPast] = useState(false);
   const [showScheduled, setShowScheduled] = useState(false);
   const [error, setError] = useState();
   const [company, setCompany] = useState({});
   const token = useSelector(state => state.application.token)
   const loading = !staff;
  
   useEffect(() => {
    const getData = async () => {
        const { comp_id } = decode(token);
        await dispatch(loadJobsFromAPI(comp_id));
        let msg = await dispatch(getStaffFromAPI(id));
        if (msg){
            setError(msg)       
        }
        const companyData = await CompanyAPI.getCompany(comp_id);
        setCompany(companyData)
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
                                <b>Years with {company.name}: </b> {staff.years_at_company}
                            </ListItemText>
                        </ListItem>
                        <ListItem>
                            <ListItemText>
                                <b>Current Job:</b> {staff.current_job? <Chip 
                                                            label={allJobs[staff.current_job].title} 
                                                            component="a" href={`/job/${allJobs[staff.current_job].id}`}
                                                            color="primary"
                                                            clickable />: 
                                <Typography>Not currently working</Typography>} 
                            </ListItemText>
                         </ListItem>
                
                        <ListItem onClick={() => setShowScheduled(!showScheduled)}>
                            <ListItemText style={{cursor: 'pointer'}}>
                                <b>Scheduled Jobs</b>
                                {showScheduled ?  <ArrowDropUpIcon /> : <ArrowDropDownIcon /> }
                            </ListItemText>
                        </ListItem> 
                        <Collapse in={showScheduled} timeout="auto" >
                                <List component="div" disablePadding >
                                    {staff.scheduled_jobs.map(id => 
                                                    <ListItem key={id} >
                                                        <Box >         
                                                            <Chip 
                                                            label={allJobs[id].title} 
                                                            component="a" href={`/job/${id}`}
                                                            color="primary"
                                                            clickable />
                                                        </Box>
                                                    </ListItem>
                                )}
                                </List>
                            </Collapse>
                
                        <ListItem onClick={() => setShowPast(!showPast)}>
                            <ListItemText style={{cursor: 'pointer'}}>
                                <b>Work History</b>
                                {showPast ?  <ArrowDropUpIcon /> : <ArrowDropDownIcon /> }
                            </ListItemText>
                        </ListItem> 
                        <Collapse in={showPast} timeout="auto" >
                                <List component="div" disablePadding >
                                    {staff.past_jobs.map(id => 
                                                    <ListItem key={id} >
                                                        <Box >         
                                                            <Chip 
                                                            label={allJobs[id].title} 
                                                            component="a" href={`/job/${staff.id}`}
                                                            color="primary"
                                                            clickable />
                                                        </Box>
                                                    </ListItem>
                                )}
                                </List>
                            </Collapse>
                        <ListItem>
                            <Button variant='contained' color='secondary'>Edit Staff</Button>
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
