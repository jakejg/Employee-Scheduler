import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {getJobFromAPI} from '../actions/jobs';
import {loadStaffFromAPI} from '../actions/staff';
import {Paper, Box, Typography, makeStyles, Grid, List, ListItem, ListItemText, Button, Dialog, DialogTitle } from '@material-ui/core';
import Loading from './Loading';
import AddStaffToJob from './AddStaffToJob';
import NotFound from './NotFound';

const Job = () => {
    const { id } = useParams();
    const [isOpen, setIsOpen] = useState(false);
    const [error, setError] = useState();
    const job = useSelector(state => state.jobs[id]);
    const dispatch = useDispatch();
    const loading = !job;



    useEffect(() => {
        const getJob = async () => {
            let msg = await dispatch(getJobFromAPI(id));
            if (msg) {
                setError(msg)
            }
        }
        getJob();
    }, [dispatch, id])

    if (error) return <NotFound msg={error}/>
    if (loading) return <Loading/>
    
    const staffNames = job.staff.map(staff => `${staff.first_name} ${staff.last_name}`)
 
    return (
        <>
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
                                <b>Staff:</b> {job.staff.length ? staffNames : 
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
                            <Button variant='outlined'>Edit Job</Button>
                            <Button onClick={() => setIsOpen(true)} variant='outlined'>Change Staff</Button>
                        </ListItem>
                    </List>
                    
                    </Box>
                </Paper>
                   
            </Grid>
            <Grid item xs={1} sm={2}>
            </Grid>
        </Grid>
        <Dialog open={isOpen} onClose={() => setIsOpen(false)} fullWidth={true}>
            <DialogTitle><Box textAlign='center' >Add or Remove Staff </Box></DialogTitle>
            <AddStaffToJob job={job} />
        </Dialog>
        </>
        );
}

export default Job;
