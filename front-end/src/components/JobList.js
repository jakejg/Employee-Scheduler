import React from 'react';
import { useSelector } from 'react-redux';

const JobList = () => {
    const jobs = useSelector(state => state.jobs)

 

  return (
    <div >
        {Object.keys(jobs).map(id => <li>{jobs[id].title}</li>)}
    </div>
  );
}

export default JobList;
