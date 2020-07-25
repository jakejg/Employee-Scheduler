import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
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
    ListItemSecondaryAction
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

const AddStaffToJob = ({job}) => {
    const INITIAL_STATE = {staff_id: ""};
    
    const [formData, setFormData] = useState(INITIAL_STATE);
    // const [errors, setErrors] = useState([]);
    const dispatch = useDispatch()

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(formData => ({...formData, [name]: value}))
    }
  
    const add = async (e) => {
        e.preventDefault();
    //    dispatch(addStaffToJobOnAPI(job.id, formData));
    }

    const remove = () => {
        // dispatch(RemoveStaffFromJobOnAPI());
    }

    // const error = errors.map(error => <Alert key={error} color="danger" className="mt-3" >{error.replace('instance.', '')}</Alert>);
    // mx={{sm:'auto'}} width={{sm:'40%'}} mt={3}
    return (
        <Box>
        <List>
            {job.staff.map(staff => 
                <ListItem>
                    <ListItemText primary={`${staff.first_name} ${staff.last_name}`} />
                    <ListItemSecondaryAction>
                        <IconButton onClick={remove} edge="end" aria-label="delete">
                          <DeleteIcon />
                        </IconButton>
                    </ListItemSecondaryAction>
                </ListItem> 
            )}
            <ListItem>
                <form>
                    <TextField
                        label="Add Staff"
                        name= "user_id"
                        value={formData.user_id}
                        onChange={handleChange}
                        variant="outlined"
                        margin="normal"
                        size="small"
                        />
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
