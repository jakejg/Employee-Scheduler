import React from 'react';
import { useSelector } from 'react-redux';
import {List, ListItem, ListItemText, Box, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom'


const StaffList = () => {
    const staff = useSelector(state => state.staff);

    const working = [];
    const available = [];

    for (let id in staff){
        if (staff[id].isWorking) {
            working.push(staff[id].first_name)
        }
        else available.push(staff[id].first_name);
    }
    return (
        <div>
            <Typography variant='h4' align='center'>Staff Currently Working</Typography>
                <List>
                    {working.map(name => <ListItem>
                                            <ListItemText align="center" key={name}>
                                                {name}
                                            </ListItemText>
                                        </ListItem>)}
                </List>
            <Typography variant='h4' align='center'>Available Staff</Typography>
                <List>
                    {available.map(name => <ListItem>
                                                <ListItemText align="center" key={name}>
                                                    {name} 
                                                </ListItemText>
                                            </ListItem>)}
                </List>

        </div>
    );
}

export default StaffList;
