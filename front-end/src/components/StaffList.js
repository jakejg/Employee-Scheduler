import React from 'react';
import { useSelector } from 'react-redux';
import {List, ListItem, ListItemText, Box, Typography, makeStyles } from '@material-ui/core';
import { Link } from 'react-router-dom'

const useStyles = makeStyles(() => ({
    link: {
      textDecoration: 'none',
      color: 'black',
      '&:hover': {
        color: 'grey'
      }
    }
}))


const StaffList = () => {
    const staff = useSelector(state => state.staff);
    const classes = useStyles();

    const working = [];
    const available = [];

    for (let id in staff){
        if (staff[id].isWorking) {
            working.push({name: staff[id].first_name, id})
        }
        else available.push({name: staff[id].first_name, id});
    }
    return (
        <div>
            <Typography variant='h4' align='center'>Staff Currently Working</Typography>
                <List>
                    {working.map(staff => <ListItem key={staff.id}>
                                            <ListItemText align="center">
                                                <Link className={classes.link} to={`staff/${staff.id}`}>{staff.name}</Link>
                                            </ListItemText>
                                        </ListItem>)}
                </List>
            <Typography variant='h4' align='center'>Available Staff</Typography>
                <List>
                    {available.map(staff => <ListItem key={staff.id}>
                                                <ListItemText align="center">
                                                    <Link className={classes.link} to={`staff/${staff.id}`}>{staff.name}</Link>
                                                </ListItemText>
                                            </ListItem>)}
                </List>

        </div>
    );
}

export default StaffList;
