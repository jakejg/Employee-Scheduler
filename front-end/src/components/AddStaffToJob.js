import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
    Tooltip,
    Fab,
    TextField,
    Box,
    Paper,
    Button,
    ListItem,
    ListItemIcon,
    ListItemText,
    Typography,
    List, 
    IconButton,
    ListItemSecondaryAction,
    MenuItem,
    makeStyles
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import CloseIcon from '@material-ui/icons/Close';
import AddIcon from '@material-ui/icons/Add';
import Loading from './Loading';
import {loadStaffFromAPI} from '../actions/staff';
import {addStaffToJobOnAPI, removeStaffFromJobOnAPI} from '../actions/jobs';
import filterStaffOnJob from '../helpers/createOptions';
import { decode } from "jsonwebtoken";

const useStyles = makeStyles(() => ({
    purple : {
        backgroundColor: 'purple',
        "&:hover": {
            backgroundColor: '#6e0491',
        }
    }    
}))

const AddStaffToJob = ({job, closeDialog}) => {
    const staff = useSelector(state => state.staff)
    const loading = !staff
    const [staffId, setStaffId] = useState("");
    const token = useSelector(state => state.application.token)
    const classes = useStyles();
    const dispatch = useDispatch()

    useEffect(() => {

        const getData = async () => {
            const { comp_id } = decode(token);
            dispatch(loadStaffFromAPI(comp_id))
        }
        getData();
    }, [dispatch])

    if (loading) return <Loading />

    const handleChange = (e) => {
        setStaffId(e.target.value)
    }
  
    const add = async (e) => {
        e.preventDefault();
        dispatch(addStaffToJobOnAPI(job.id, +staffId));
    }

    const remove = (id) => {
        dispatch(removeStaffFromJobOnAPI(job.id, id));

    }
    /*  Create a new array with just the info needed for the select field options,
        if staff is already assigned to the job, don't show them as an option to be added again
     */
   
    const options = filterStaffOnJob(staff, job.staff);


    // const error = errors.map(error => <Alert key={error} color="danger" className="mt-3" >{error.replace('instance.', '')}</Alert>);
    // mx={{sm:'auto'}} width={{sm:'40%'}} mt={3}
    return (
        <Box>
            <Box display='flex' justifyContent='flex-end'>
                <Box width='100%' mt={1} display='flex' justifyContent='center'>
                    <Typography align='center' variant='h6' >Add or Remove Staff </Typography>
                </Box>
                <IconButton onClick={closeDialog}>
                        <Tooltip title="Close Window">
                            <CloseIcon/>
                        </Tooltip>
                </IconButton></Box>
            
        <List>
            {job.staff.map(staff => 
                <ListItem key={staff.id}>
                    <ListItemText primary={`${staff.first_name} ${staff.last_name}`} />
                    <ListItemSecondaryAction>
                        <Tooltip title='Remove Staff'>
                            <IconButton onClick={()=> remove(staff.id)} edge="end" aria-label="delete">
                              <DeleteIcon />
                            </IconButton>
                        </Tooltip>
                    </ListItemSecondaryAction>
                </ListItem> 
            )}
            <ListItem>
                <form>
                    <TextField
                        label="Select Staff"
                        select
                        value={staffId}
                        onChange={handleChange}
                        variant="outlined"
                        margin="normal"
                        size="small"
                        fullWidth
                        helperText = "Once added the job will appear on the staff's Microsoft Calendar"                       
                        >
                    {options.map(staff => 
                    <MenuItem key={staff.id} value={staff.id}>
                        {staff.full_name}
                    </MenuItem>    
                    )}     
                    </TextField>        
                    <ListItemSecondaryAction>
                        <Tooltip title="Add Staff">
                            <Fab className={classes.purple} aria-label="add" size='small'>
                                <AddIcon onClick={add} />
                            </Fab>
                        </Tooltip>
                    </ListItemSecondaryAction>
                    
                </form>    
            </ListItem>
        </List>
        </Box>
    )
}

export default AddStaffToJob;
