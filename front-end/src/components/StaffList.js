import React from 'react';
import { useSelector } from 'react-redux';
import {List, ListItem, ListItemText, Box, Typography, makeStyles, Chip } from '@material-ui/core';

const useStyles = makeStyles(() => ({
    text: {
        display: 'flex',
        justifyContent: 'start',
        width: '125px'
    },
    box: {
        display: 'flex',
        justifyContent: 'center',
    }
}))


const StaffList = () => {
    const staff = useSelector(state => state.staff);
    const classes = useStyles();

    const working = [];
    const available = [];

    for (let id in staff){
        if (staff[id].isWorking) {
            working.push({name: `${staff[id].first_name} ${staff[id].last_name}`, id})
        }
        else available.push({name: `${staff[id].first_name} ${staff[id].last_name}`, id});
    }
    return (
        <div>
            <Typography variant='h4' align='center'>Staff Currently Working</Typography>
                <List>
                    {working.map(staff => <ListItem key={staff.id} className={classes.box}>
                                            <Box  className={classes.text}>
                                                <Chip 
                                                    label={staff.name} 
                                                    component="a" href={`staff/${staff.id}`}
                                                    color="secondary"
                                                    clickable 
                                                    />
                                            </Box>
                                        </ListItem>)}
                </List>
            <Typography variant='h4' align='center'>Available Staff</Typography>
                <List>
                    {available.map(staff => <ListItem key={staff.id} className={classes.box}>
                                                <Box  className={classes.text}>
                                                    <Chip 
                                                        label={staff.name} 
                                                        component="a" href={`staff/${staff.id}`}
                                                        color="secondary"
                                                        clickable 
                                                    />   
                                                </Box>
                                            </ListItem>)}
                </List>

        </div>
    );
}

export default StaffList;
