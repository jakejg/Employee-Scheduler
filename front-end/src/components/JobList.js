import React from 'react';
import { useSelector } from 'react-redux';
import {List, ListItem, ListItemText, Box, Typography } from '@material-ui/core';
import moment from 'moment'


const JobList = () => {
    const jobs = useSelector(state => state.jobs)
    
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
                                                            {inProgress[id].title}
                                                        </ListItemText>
                                                    </ListItem>)}
            </List>
            <Typography variant='h4' align='center'>Jobs Scheduled</Typography>
            <List>
                {Object.keys(scheduled).map(id => <ListItem key={id}>
                                                        <ListItemText align='center'>
                                                            {scheduled[id].title}
                                                        </ListItemText>
                                                    </ListItem>)}
            </List>

        </div>
    );
}

export default JobList;
