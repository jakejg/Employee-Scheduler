import React from 'react';
import Timeline from 'react-calendar-timeline'
// make sure you include the timeline stylesheet or the timeline will not be styled
import 'react-calendar-timeline/lib/Timeline.css'
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment'
import { TextareaAutosize } from '@material-ui/core';
import Tit from './Job'
import {useHistory} from 'react-router-dom';
import {editJobOnAPI} from '../actions/jobs';
import {editJob} from '../actions/jobs';

const Calender = () => {
    const jobs = useSelector(state => state) || {};
    const history = useHistory();
    const dispatch = useDispatch();

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
        job.end_time = newStartTime + (end_time - start_time);
        job.start_time = newStartTime;
      
        //change redux state
        dispatch(editJob(itemId, job))
        // change in database
        dispatch(editJobOnAPI(itemId, job))
    }
    

return (
    <Timeline
      groups={groups}
      items={items}
      canMove={true}
      itemHeightRatio={0.75}
      onItemDoubleClick={handleDoubleClick}
      onItemMove={handleMove}
      defaultTimeStart={moment().add(-30, 'day')}
      defaultTimeEnd={moment().add(30, 'day')}
    />
)
}
export default Calender;

