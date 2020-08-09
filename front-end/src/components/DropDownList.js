import React from 'react';
import {Paper, Fab, Chip, Box, Typography, makeStyles, Grid, List, ListItem, ListItemText, ListItemIcon, Button, Collapse } from '@material-ui/core';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';

const DropDownList = ({state, setState, title, arrayToMap, allJobs}) => {

    return (
        <>
            <ListItem onClick={() => setState(!state)}>
                                <ListItemText style={{cursor: 'pointer'}}>
                                    <b>{title}</b>
                                    {state ?  <ArrowDropUpIcon /> : <ArrowDropDownIcon /> }
                                </ListItemText>
            </ListItem> 
            <Collapse in={state} timeout="auto" >
                    <List component="div" disablePadding >
                        {arrayToMap.map(id => 
                                        <ListItem key={id} >
                                            <Box >         
                                                <Chip 
                                                label={allJobs[id].title} 
                                                component="a" href={`/job/${id}`}
                                                color="primary"
                                                clickable />
                                            </Box>
                                        </ListItem> )}
                    </List>
            </Collapse>   
        </>                        
        )
}

export default DropDownList;
