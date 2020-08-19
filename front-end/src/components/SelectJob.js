import React, {useState} from 'react';
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
import AddStaffToJob from './AddStaffToJob';
import {getJobFromAPI} from '../actions/jobs';

const SelectJob = ({closeDialog}) => {
    const jobs = useSelector(state => state.jobs);
    const [jobId, setJobId] = useState("");
    const [selected, setSelected] = useState(false)
    const dispatch = useDispatch();

    const handleChange = (e) => {
        setJobId(e.target.value)
    }
  
    const select = async (e) => {
        e.preventDefault();
        await getJob(jobId);
        setSelected(true);
    }

    const getJob = async (id) => {
        await dispatch(getJobFromAPI(id));
    }


    // const error = errors.map(error => <Alert key={error} color="danger" className="mt-3" >{error.replace('instance.', '')}</Alert>);
    // mx={{sm:'auto'}} width={{sm:'40%'}} mt={3}
    return (
        <>
        {selected ?  <AddStaffToJob job={jobs[jobId]} closeDialog={closeDialog} /> 
        :
        <Box>
            <List>
                <ListItem>
                    <form>
                        <TextField
                            label="Select A Job"
                            select
                            value={jobId}
                            onChange={handleChange}
                            variant="outlined"
                            margin="normal"
                            size="small"
                            helperText="Select a job to add staff to"                   
                            >
                        {Object.keys(jobs).map(id => 
                        <MenuItem key={id} value={id}>
                            {jobs[id].title}
                        </MenuItem>    
                        )}     
                        </TextField>        
                        <ListItemSecondaryAction>
                              <Button variant='contained' onClick={select} >Select Job</Button>
                        </ListItemSecondaryAction>
                        
                    </form>    
                </ListItem>
            </List>
        </Box>
        }
        </>
    )
}

export default SelectJob;
