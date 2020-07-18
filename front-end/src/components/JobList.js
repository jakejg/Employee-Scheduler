import React, {useEffect} from 'react';
import { loadJobsFromAPI } from '../actions/jobs';
import { useDispatch, useSelector } from 'react-redux';

const JobList = () => {
    const jobs = useSelector(state => state) || {}

 

  return (
    <div >
        {Object.keys(jobs).map(id => <li>{jobs[id].title}</li>)}
    </div>
  );
}

export default JobList;
