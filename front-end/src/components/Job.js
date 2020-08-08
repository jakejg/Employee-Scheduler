import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {getJobFromAPI} from '../actions/jobs';
import {loadStaffFromAPI, getStaffFromAPI} from '../actions/staff';
import {Paper, Box, Typography, makeStyles, Grid, List, ListItem, ListItemText, Button, Dialog, DialogTitle } from '@material-ui/core';
import DoneOutlineRoundedIcon from '@material-ui/icons/DoneOutlineRounded';
import Loading from './Loading';
import AddStaffToJob from './AddStaffToJob';
import NotFound from './NotFound';
import getTotalCost from '../helpers/totalJobCost';

const useStyles = makeStyles(() => ({
    checkMark: {
        color: 'green', 
        marginLeft: '5px', 
        marginBottom: '-5px'
    },

    paper:{
        margin: '30px'
    },
    green: {
        border: 'solid green 3px',
        margin: '30px'
        
    }


}))
  

const Job = () => {
    const { id } = useParams();
    const [isOpen, setIsOpen] = useState(false);
    const [error, setError] = useState();
    const job = useSelector(state => state.jobs[id]);
    const dispatch = useDispatch();
    const loading = !job;
    const classes = useStyles();

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
    
    const staffNames = job.staff.map(staff => `${staff.first_name} ${staff.last_name}`);
    const jobFilled = job.staff.length >= job.staff_needed;

    
    return (
        <>
        <Grid container>
            <Grid item xs={1} sm={2}>
            </Grid>
            <Grid item xs={10} sm={8}>
                <Paper elevation={5} className={jobFilled ? classes.green : classes.paper}>
                    <Box py={3}>
                        <Box textAlign='center'>
                            <Typography display="inline" variant="h5">{job.title}</Typography>
                            {jobFilled &&
                            <DoneOutlineRoundedIcon fontSize='large' className={classes.checkMark}/>}
                        </Box>
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
                            <ListItemText >
                                <b>Total Staffing Cost: </b> ${getTotalCost(job)}
                            </ListItemText>
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
