import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {Link} from 'react-router-dom';
import {List, ListItem, ListItemText, Box, Typography, makeStyles, ListItemIcon } from '@material-ui/core';
import DoneOutlineRoundedIcon from '@material-ui/icons/DoneOutlineRounded';
import moment from 'moment';


const useStyles = makeStyles(() => ({
    link: {
      textDecoration: 'none',
      color: 'black',
      '&:hover': {
        color: 'grey'
      }
    },
    checkMark: {
        color: 'green', 
        marginLeft: '5px'
    }
}))


const JobList = () => {
    const jobs = useSelector(state => state.jobs)
    const classes = useStyles();
    
    let inProgress = {};
    let scheduled = {};
    for (let key in jobs){
        if (jobs[key].start_time > moment()){
            scheduled[key] = jobs[key]
        }
        else if (jobs[key].end_time > moment()){
            inProgress[key] = jobs[key]
        }
        
    }
    
    return (
        <div>
            <Typography variant='h4' align='center'>Jobs in Progress</Typography>
            <List>
                {Object.keys(inProgress).map(id => <ListItem key={id}>
                                                        <ListItemText align='center'>
                                                            <Link className={classes.link} to={`job/${id}`}>{inProgress[id].title}</Link>
                                                        </ListItemText>
                                                    </ListItem>)}
            </List>
            <Typography variant='h4' align='center'>Jobs Scheduled</Typography>
            <List>
                {Object.keys(scheduled).map(id => <ListItem key={id}>
                                                        <ListItemText align='center'>
                                                        
                                                        <Link className={classes.link} to={`job/${id}`}>{scheduled[id].title}</Link>
                                                       
                                                        {scheduled[id].staff_filled && <DoneOutlineRoundedIcon fontSize='small' className={classes.checkMark}/>}
                                                        </ListItemText>
                                                        
                                                    </ListItem>)}
            </List>

        </div>
    );
}

export default JobList;
