import React from 'react';
import Timeline from 'react-calendar-timeline'
// make sure you include the timeline stylesheet or the timeline will not be styled
import 'react-calendar-timeline/lib/Timeline.css'
import { useSelector } from 'react-redux';
import moment from 'moment'

const Calender = () => {
    const jobs = useSelector(state => state) || {};

    const items = Object.keys(jobs).map(id => jobs[id]);
    let groups = Object.keys(jobs).map(id => ({id: +id , title:jobs[id].title}));
    
    //groups can't be empty on the first render or it will cause dispaly issues
    if (!groups.length) groups = [{}];


return (
    <Timeline
      groups={groups}
      items={items}
      defaultTimeStart={moment().add(-30, 'day')}
      defaultTimeEnd={moment().add(30, 'day')}
    />
)
}
export default Calender;

