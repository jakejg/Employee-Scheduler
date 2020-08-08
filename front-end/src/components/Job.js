import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {getJobFromAPI} from '../actions/jobs';
import {loadStaffFromAPI, getStaffFromAPI} from '../actions/staff';
import {Paper, 
    Box, 
    Typography, 
    makeStyles, 
    Grid, 
    List, 
    ListItem, 
    ListItemText, 
    Button, 
    Dialog, 
    DialogTitle,
    Chip,
    Collapse } from '@material-ui/core';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import DoneOutlineRoundedIcon from '@material-ui/icons/DoneOutlineRounded';
import Loading from './Loading';
import AddStaffToJob from './AddStaffToJob';
import NotFound from './NotFound';
import getTotalCost from '../helpers/totalJobCost';
import ButtonGroup from './ButtonGroup';

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
    const [showStaff, setShowStaff] = useState();
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
    
    return (
        <>
        <Grid container>
            <Grid item xs={1} sm={2}>
            </Grid>
            <Grid item xs={10} sm={8}>
                <Paper elevation={5} className={job.staff_filled ? classes.green : classes.paper}>
                    <Box py={3}>
                        <Box textAlign='center'>
                            <Typography display="inline" variant="h5">{job.title}</Typography>
                            {job.staff_filled &&
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
                        <ListItem onClick={() => setShowStaff(!showStaff)}>
                            <ListItemText style={{cursor: 'pointer'}}>
                                <b>Staff</b>
                                {showStaff ?  <ArrowDropUpIcon /> : <ArrowDropDownIcon /> }
                            </ListItemText>
                        </ListItem> 
                        <Collapse in={showStaff} timeout="auto" >
                                <List component="div" disablePadding >
                                    {job.staff.map(staff => 
                                                    <ListItem key={staff.id} >
                                                        <Box >         
                                                            <Chip 
                                                            label={`${staff.first_name} ${staff.last_name}`} 
                                                            component="a" href={`/staff/${id}`}
                                                            color="secondary"
                                                            clickable />
                                                        </Box>
                                                    </ListItem>
                                )}
                                </List>
                            </Collapse>
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
                            <Box width='50%'>
                            <ButtonGroup>
                                <Button variant='contained' color='primary'>Edit Job</Button>
                                <Button onClick={() => setIsOpen(true)} color='secondary' variant='contained'>Change Staff</Button>
                            </ButtonGroup>
                            </Box>
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
