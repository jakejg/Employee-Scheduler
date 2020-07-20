import React, {useEffect} from 'react';
import {useParams} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {getStaffFromAPI} from '../actions/staff';

const Staff = () => {
   const { id } = useParams();
   const dispatch = useDispatch();
   const staff = useSelector(state => state.staff[id]) || {};
   const allJobs = useSelector(state => state.jobs);
  

   useEffect(() => {
    const getStaff = async () => {
        dispatch(getStaffFromAPI(id));
    }
    getStaff();
}, [dispatch, id])
   
    return (
        <div className="item">
            <div>{staff.first_name} {staff.last_name}</div>
            <ul>
                {staff.jobs ? staff.jobs.map(id => <li>{allJobs[id] ? allJobs[id].title: null}</li>): null}
            </ul>
        </div>
        );
}

export default Staff;
