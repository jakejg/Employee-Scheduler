import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {getStaffFromAPI, editStaffOnAPI} from '../../actions/staff';
import {loadJobsFromAPI} from '../../actions/jobs';
import {Paper, Input, Fab, Chip, Box, Typography, makeStyles, Grid, List, ListItem, ListItemText} from '@material-ui/core';
import Loading from '../Loading';
import { decode } from "jsonwebtoken";
import NotFound from '../NotFound';
import { CompanyAPI } from '../../api/CompanyApi';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import DeleteIcon from '@material-ui/icons/Delete';
import DropDownList from '../DropDownList';
import DeleteAlert from '../DeleteAlert';
import clsx from 'clsx';
import Sidebar from '../Sidebar';
import { drawerWidth } from '../../config';


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

const Staff = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const staff = useSelector(state => state.staff[id])
    const allJobs = useSelector(state => state.jobs);
    const [showPast, setShowPast] = useState(false);
    const [showScheduled, setShowScheduled] = useState(false);
    const [error, setError] = useState();
    const [edit, setEdit] = useState(false)
    const [company, setCompany] = useState({});
    const token = useSelector(state => state.application.token)
    const loading = !staff;
    const [formData, setFormData] = useState({})
    const [dialog, setDialog] = useState(false)
    const classes = useStyles();
    const open = useSelector(state => state.application.drawer)

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
    }, [dispatch, id, token])

    if (error)  return <NotFound msg={error}/>
    if (loading) return <Loading />
   
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(formData => ({...formData, [name]: value}))
    }

    const handleEditClick = () => {
        setEdit(edit => !edit)
        setFormData(formData => ({
                first_name: staff.first_name,
                last_name: staff.last_name,
                email: staff.email, 
                current_wage: staff.current_wage,
                years_at_company: staff.years_at_company})
                )
    }

    const handleSave = () => {
        dispatch(editStaffOnAPI(id, formData))
        setEdit(!edit)
    }
    const handleDelete = () => {
        setDialog(dialog => true)
    }


    return (
        <div className={classes.root}>
            <Sidebar />
            <div className={clsx(classes.content, {
                [classes.contentShift]: open,
             })} >
            <Grid container>
            <Grid item xs={1} sm={2}>
            </Grid>
            <Grid item xs={10} sm={8}>
                <Paper elevation={5}>
                    <Box m={4} py={2}>
                    <Typography variant='h5' align='center'>
                    {edit ?
                        <>  
                        <Input
                            value={formData.first_name}
                            name='first_name'
                            onChange={handleChange}
                        ></Input>
                        <Input
                            value={formData.last_name}
                            name='last_name'
                            onChange={handleChange}
                        ></Input>
                        </> :
                        <>{staff.first_name} {staff.last_name}</> }
                    </Typography>
                    
                    <List>
                        <ListItem>
                            <ListItemText >
                                <b>Email:</b> {edit ?  
                        <Input
                            value={formData.email}
                            name='email'
                            onChange={handleChange}
                            type='email'
                        ></Input> :
                        staff.email}
                            </ListItemText>
                        </ListItem>
                        <ListItem>
                            <ListItemText >
                                <b>Current Wage:</b>  {edit ?  
                        <Input
                            value={formData.current_wage}
                            name='current_wage'
                            onChange={handleChange}
                            type='number'
                        ></Input> :
                            <>${staff.current_wage}</>}
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
                        <DropDownList 
                                state={showScheduled} 
                                setState={setShowScheduled}
                                title="Scheduled Jobs"
                                arrayToMap={staff.scheduled_jobs}
                                allJobs={allJobs}
                                />
                        <DropDownList 
                                state={showPast} 
                                setState={setShowPast}
                                title="Work History"
                                arrayToMap={staff.past_jobs}
                                allJobs={allJobs}
                                />
                        <ListItem>
                            <Fab style={{margin: '5px'}} onClick={handleEditClick} color="secondary" size="medium" aria-label="edit">
                                <EditIcon />
                            </Fab>
                            <Fab style={{margin: '5px'}} onClick={handleDelete} color="inherit" size="medium" aria-label="edit">
                                <DeleteIcon />
                            </Fab>
                            <DeleteAlert id={id} type="staff" dialog={dialog} setDialog={setDialog}/>
                            {edit && <Fab style={{margin: '5px'}} onClick={handleSave} color="primary" size="medium" aria-label="save">
                                <SaveIcon />
                            </Fab>}
                        </ListItem>
                    </List>      
                    </Box>
                </Paper>          
            </Grid>
            <Grid item xs={1} sm={2}>
            </Grid>
      </Grid>
      </div>
      </div>
        );
}

export default Staff;
