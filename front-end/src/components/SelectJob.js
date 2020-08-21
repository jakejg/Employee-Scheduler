import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { decode } from "jsonwebtoken";
import {
    Tooltip,
    TextField,
    Box,
    Button,
    ListItem,
    List, 
    IconButton,
    ListItemSecondaryAction,
    MenuItem,
} from '@material-ui/core';
import AddStaffToJob from './AddStaffToJob';
import {getJobFromAPI} from '../actions/jobs';
import { JobAPI } from '../api/JobApi';
import CloseIcon from '@material-ui/icons/Close';

const SelectJob = ({closeDialog}) => {
    const [jobs, setJobs] = useState({});
    const [jobId, setJobId] = useState("");
    const job = useSelector(state => state.jobs[jobId])
    const [selected, setSelected] = useState(false);
    const token = useSelector(state => state.application.token)
    const dispatch = useDispatch();

    useEffect(() => {

        const getData = async () => {
            const { comp_id } = decode(token);
            let data = await JobAPI.loadJobs(comp_id);
            setJobs(jobs => data);
        }
        getData();
    }, [dispatch, token])

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
        {selected ?  <AddStaffToJob job={job} closeDialog={closeDialog} /> 
        :
        <Box>
            <Box display='flex' justifyContent='flex-end'>
                              <IconButton onClick={closeDialog}>
                                  <Tooltip title="Close Window">
                                      <CloseIcon/>
                                  </Tooltip>
                              </IconButton>
                          </Box>
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
