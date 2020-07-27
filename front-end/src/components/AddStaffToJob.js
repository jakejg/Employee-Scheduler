import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
    Grid,
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
    MenuItem
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import Loading from './Loading';
import {loadStaffFromAPI} from '../actions/staff';
import {addStaffToJobOnAPI, removeStaffFromJobOnAPI} from '../actions/jobs';
import filterStaffOnJob from '../helpers/createOptions';
import { decode } from "jsonwebtoken";

const AddStaffToJob = ({job}) => {
    const staff = useSelector(state => state.staff)
    const loading = !staff
    const [staffId, setStaffId] = useState("");
    const token = useSelector(state => state.application.token)
    // const [errors, setErrors] = useState([]);
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
        <List>
            {job.staff.map(staff => 
                <ListItem key={staff.id}>
                    <ListItemText primary={`${staff.first_name} ${staff.last_name}`} />
                    <ListItemSecondaryAction>
                        <IconButton onClick={()=> remove(staff.id)} edge="end" aria-label="delete">
                          <DeleteIcon />
                        </IconButton>
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
                        >
                    {options.map(staff => 
                    <MenuItem key={staff.id} value={staff.id}>
                        {staff.full_name}
                    </MenuItem>    
                    )}     
                    </TextField>        
                    <ListItemSecondaryAction>
                        <Button variant="contained" onClick={add}>Add</Button>
                    </ListItemSecondaryAction>
                    
                </form>    
            </ListItem>
        </List>
        </Box>
    )
}

export default AddStaffToJob;
