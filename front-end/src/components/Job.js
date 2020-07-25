import React, {useEffect} from 'react';
import {useParams} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {getJobFromAPI} from '../actions/jobs';
import {Paper, Box, Typography, makeStyles } from '@material-ui/core';

const Job = () => {
   const { id } = useParams();
   const dispatch = useDispatch();
   const job = useSelector(state => state.jobs[id]) || {};
   const allStaff = useSelector(state => state.staff);
  

   useEffect(() => {
    const getJob = async () => {
        dispatch(getJobFromAPI(id));
    }
    getJob();
}, [dispatch, id])
   
    return (
        <div className="item">
            <div>{job.title}</div>
            <ul>
                {job.staff ? job.staff.map(id => <li>{allStaff[id] ? allStaff[id].first_name: null}</li>): null}
            </ul>
        </div>
        );
}

export default Job;
