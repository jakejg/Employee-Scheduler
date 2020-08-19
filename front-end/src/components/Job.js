import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {getJobFromAPI, editJobOnAPI} from '../actions/jobs';
import {Paper, 
    Fab,
    Box, 
    Typography, 
    makeStyles, 
    Grid, 
    List, 
    ListItem, 
    ListItemText, 
    Input, 
    Dialog, 
    DialogTitle,
    Chip,
    Collapse,
    useMediaQuery } from '@material-ui/core';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import EditIcon from '@material-ui/icons/Edit';
import DoneOutlineRoundedIcon from '@material-ui/icons/DoneOutlineRounded';
import DeleteIcon from '@material-ui/icons/Delete';
import Loading from './Loading';
import AddStaffToJob from './AddStaffToJob';
import NotFound from './NotFound';
import getTotalCost from '../helpers/totalJobCost';
import DeleteAlert from './DeleteAlert';
import SaveIcon from '@material-ui/icons/Save';
import statusToColor from '../helpers/jobColorObj';


const useStyles = makeStyles(() => ({
    checkMark: {
        color: 'green', 
        marginLeft: '5px', 
        marginBottom: '-5px'
    },

    yellow:{
        border: 'solid #f0ad4e 3px',
        margin: '30px'
    },
    green: {
        border: 'solid green 3px',
        margin: '30px'
    },
    red: {
        border: 'solid red 3px',
        margin: '30px'
    }
}))
  
const Job = () => {
    const { id } = useParams();
    const [isOpen, setIsOpen] = useState(false);
    const [error, setError] = useState();
    const [showStaff, setShowStaff] = useState();
    const [deleteDialog, setDeleteDialog] = useState(false);
    const [edit, setEdit] = useState(false);
    const [formData, setFormData] = useState({})
    const job = useSelector(state => state.jobs[id]);

    const dispatch = useDispatch();
    const loading = !job;
    const classes = useStyles();
    const smallScreen = useMediaQuery('(max-width:400px)');
    const statusColor = statusToColor();

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

    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(formData => ({...formData, [name]: value}))
    }

    const handleEditClick = () => {
        setEdit(edit => !edit)
        setFormData(formData => ({
            start_time: job.start_time.format('YYYY-MM-DD'),
            end_time: job.end_time.format('YYYY-MM-DD'),
            staff_needed: job.staff_needed,
            notes: job.notes
               })
        )
    }
    const handleSave = () => {
        dispatch(editJobOnAPI(id, formData))
        setEdit(!edit)
    }
    const handleDelete = () => {
        setDeleteDialog(deleteDialog => true)
    }

    const closeDialog = () => {
        setIsOpen(false)
    }
    
    return (
        <>
        <Grid container>
            <Grid item xs={false} sm={2}>
            </Grid>
            <Grid item xs={12} sm={8}>
                <Paper elevation={5} className={classes[statusColor[job.status]]}>
                    <Box py={3}>
                        <Box textAlign='center'>
                            <Typography display="inline" variant="h5">{job.title}</Typography>
                            {job.status === 'filled' &&
                            <DoneOutlineRoundedIcon fontSize='large' className={classes.checkMark}/>}
                        </Box>
                    <List>
                        <ListItem>
                            <ListItemText >
                                <b>Start:</b> {edit ?  
                            <Input
                                value={formData.start_time}
                                name='start_time'
                                onChange={handleChange}
                                type='date'
                            ></Input>:
                            job.start_time.format("dddd, MMMM Do YYYY, h:mm:ss a")}
                            </ListItemText>
                        </ListItem>
                        <ListItem>
                            <ListItemText >
                                <b>End:</b> {edit ?  
                            <Input
                                value={formData.end_time}
                                name='end_time'
                                onChange={handleChange}
                                type ='date'
                            ></Input>:
                            job.end_time.format("dddd, MMMM Do YYYY, h:mm:ss a")}
                            </ListItemText>
                        </ListItem>
                        <ListItem>
                            <ListItemText >
                                <b>Staff Needed:</b> {edit ?  
                            <Input
                                value={formData.staff_needed}
                                name='staff_needed'
                                onChange={handleChange}
                                type='number'
                            ></Input>:
                            job.staff_needed}
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
                                                            component="a" href={`/staff/${staff.id}`}
                                                            color="secondary"
                                                            clickable />
                                                        </Box>
                                                    </ListItem>
                                )}
                                </List>
                            </Collapse>
                        <ListItem>
                            <ListItemText >
                                <b>Total Staffing Cost: </b> ${getTotalCost(job)}
                            </ListItemText>
                        </ListItem>
                        <ListItem>
                            <ListItemText >
                                <b>Notes:</b> {edit ?  
                            <Input
                                value={formData.notes}
                                name='notes'
                                onChange={handleChange}
                                fullWidth
                            ></Input>:
                            job.notes}
                            </ListItemText>
                        </ListItem>
                        <ListItem>
                            <Fab style={{margin: '5px'}} onClick={handleEditClick} color="primary" size={smallScreen ? 'small': 'medium'} aria-label="edit">
                                    <EditIcon />
                                </Fab>
                            <Fab style={{margin: '5px'}} onClick={handleDelete} color="inherit" size={smallScreen ? 'small': 'medium'} aria-label="edit">
                                <DeleteIcon />
                            </Fab>
                            {edit && <Fab style={{margin: '5px'}} onClick={handleSave} color="primary" size={smallScreen ? 'small': 'medium'} aria-label="save">
                                <SaveIcon />
                            </Fab>}
                            <DeleteAlert id={id} type="job" dialog={deleteDialog} setDialog={setDeleteDialog}/>
                            <Fab style={{margin: '5px'}} onClick={() => setIsOpen(true)} color='secondary' variant='extended'>Change Staff</Fab>
                        </ListItem>
                    </List>
                    
                    </Box>
                </Paper>
                   
            </Grid>
            <Grid item xs={false} sm={2}>
            </Grid>
        </Grid>
        <Dialog open={isOpen} onClose={closeDialog} fullWidth={true}>
            <AddStaffToJob job={job}
                            closeDialog={closeDialog} />
        </Dialog>
        </>
        );
}

export default Job;
