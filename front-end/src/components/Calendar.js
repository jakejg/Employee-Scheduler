import React, {useEffect} from 'react';
import Timeline from 'react-calendar-timeline'
// make sure you include the timeline stylesheet or the timeline will not be styled
import 'react-calendar-timeline/lib/Timeline.css'
import { useSelector, useDispatch } from 'react-redux';
import {Paper, Box, Container, Typography } from '@material-ui/core';
import moment from 'moment'
import {useHistory} from 'react-router-dom';
import {editJob} from '../actions/jobs';
import {JobAPI} from '../helpers/JobApi';
import { loadJobsFromAPI } from '../actions/jobs';
import { decode } from 'jsonwebtoken';

const Calendar = () => {
    const jobs = useSelector(state => state.jobs);
    const token = useSelector(state => state.application.token);
    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        const getData = async () => {
            const { comp_id } = decode(token);
            dispatch(loadJobsFromAPI(comp_id));
        }
        getData();
    }, [dispatch])

    // calender takes two props an array of events/item objects and array of grouping
    let items = Object.keys(jobs).map(id => jobs[id]);
    let groups = Object.keys(jobs).map(id => ({id: +id , title:jobs[id].title}));
    
    //groups can't be empty on the first render or it will cause dispaly issues
    if (!groups.length) groups = [{}];

    const handleDoubleClick = (itemId, e, time) => {
        history.push(`/job/${itemId}`)
    }
    const handleMove = (itemId, newStartTime, newGroupOrder) =>{
        let job = jobs[itemId];
       
        let {start_time, end_time } = job;
        job.end_time = moment(newStartTime + (end_time - start_time));
        job.start_time = moment(newStartTime);
      
        //change redux state
        dispatch(editJob(itemId, job))
        // change in database
        JobAPI.editJob(itemId, job)
    }
    

return (
    <Container>
        <Paper>
            <Typography>Double click on a job to view details</Typography>
        </Paper>
    <Paper>
        <Timeline
          groups={groups}
          items={items}
          canMove={true}
          itemHeightRatio={0.75}
          lineHeight={40}
          onItemDoubleClick={handleDoubleClick}
          onItemMove={handleMove}
          defaultTimeStart={moment().add(-30, 'day')}
          defaultTimeEnd={moment().add(30, 'day')}
        />
    </Paper>
    </Container>
)
}
export default Calendar;

