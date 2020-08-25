import React from 'react';
import { useSelector} from 'react-redux';
import {List, ListItem, Box, Typography, makeStyles, Chip, Tooltip} from '@material-ui/core';
import DoneOutlineRoundedIcon from '@material-ui/icons/DoneOutlineRounded';
import moment from 'moment';
import Loading from '../Loading';
import statusToColor from '../../helpers/jobColorObj';

const useStyles = makeStyles(() => ({
    green: {
        color: 'green', 
        marginLeft: '5px', 
        marginTop: '5px'
    },
    yellow: {
        color: '#f0ad4e', 
        marginLeft: '5px', 
        marginTop: '5px'
    },
    red: {
        color: 'red', 
        marginLeft: '5px', 
        marginTop: '5px'
    },
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


const JobList = () => {
    const jobs = useSelector(state => state.jobs)
    const classes = useStyles();
    const loading = !Object.keys(jobs).length
    const statusColor = statusToColor();

    if (loading) return <Loading />

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
    const getText = (type,id) => {
        let toolTipText;
        if (type[id].status === 'under'){
            toolTipText = 'Need Staff';
        }
        else if (type[id].status === 'filled'){
            toolTipText = 'Staff Filled';
        }
        else {
            toolTipText = 'Over Staffed';
        }
        return toolTipText;
    }

    const getStaffNames = (staffList) => {
        if (!staffList.length) return ""

        return (<List disablePadding={true}>
                    {staffList.map(staff => <ListItem key={staff.id} dense={true}>
                                                {`${staff.first_name} ${staff.last_name}`}
                                            </ListItem>)}
                </List>)
    }
    
    return (
        <div>
            <Typography variant='h4' align='center'>Jobs in Progress</Typography>
            <List>
                {Object.keys(inProgress).map(id => <ListItem key={id} className={classes.box}>
                                                        <Box  className={classes.text}> 
                                                            <Tooltip title={getStaffNames(inProgress[id].staff)} placement="left">    
                                                                <Chip 
                                                                label={inProgress[id].title} 
                                                                component="a" href={`job/${id}`}
                                                                color="primary"
                                                                clickable />
                                                            </Tooltip>    
                                                            <Tooltip title={getText(inProgress, id)}>
                                                                <DoneOutlineRoundedIcon fontSize='small' className={classes[statusColor[inProgress[id].status]]}/>
                                                            </Tooltip>
                                                        </Box>
                                                    </ListItem>)}
            </List>
            <Typography variant='h4' align='center'>Jobs Scheduled</Typography>
            <List >
                {Object.keys(scheduled).map(id => <ListItem key={id} className={classes.box}>
                                                        <Box  className={classes.text}>
                                                            <Tooltip title={getStaffNames(scheduled[id].staff)} placement="left">
                                                                <Chip 
                                                                    label={scheduled[id].title} 
                                                                    component="a" href={`job/${id}`}
                                                                    color="primary"
                                                                    clickable
                                                                    />
                                                            </Tooltip>
                                                            <Tooltip title={getText(scheduled, id)}>
                                                                <DoneOutlineRoundedIcon fontSize='small' className={classes[statusColor[scheduled[id].status]]}/>
                                                            </Tooltip>
                                                        </Box> 
                                                    </ListItem>)}
            </List>

        </div>
    );
}

export default JobList;
