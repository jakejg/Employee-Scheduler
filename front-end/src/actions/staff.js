import axios from 'axios';
import { 
    LOAD_STAFF,
    EDIT_STAFF
 } from './actionTypes';
import moment from 'moment'


const BASE_URL = process.env.BASE_URL || `http://localhost:5000`;

export const loadStaffFromAPI = () => {
    return async (dispatch) => {
        try {
            let res = await axios.get(`${BASE_URL}/users`);
            /* create an object of nested objects with data keyed by id */
            const staffData = {};
            for (let {id, username, first_name, last_name, current_job} of res.data.users) {

                staffData[id] = {
                    id,
                    username,
                    first_name,
                    last_name,
                    current_job,
                    past_jobs: [],
                    scheduled_jobs: []
                }
            }
      
            dispatch(loadStaff(staffData));
        }
        catch(e) {
            console.log(e)
        }
    }
}

export const loadStaff = (staff) => {
    return {type: LOAD_STAFF, staff}
}


export const getStaffFromAPI = (ID) => {
    return async (dispatch) => {
        try {
            let res = await axios.get(`${BASE_URL}/users/${ID}`);

            let {id, username, first_name, last_name} = res.data.users
            // getWorkHistory(jobs)
            // getWorkSchedule(jobs)
            // getCurrentJob(job)

                staffData[id] = {
                    id,
                    username,
                    first_name,
                    last_name,
                    current_job,
                    past_jobs: [],
                    scheduled_jobs: []
                }
            }
        catch(e) {
            console.log(e)
        }
    }
}