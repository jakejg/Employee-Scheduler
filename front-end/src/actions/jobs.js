import axios from 'axios';
import { LOAD_JOBS } from './actionTypes';
import moment from 'moment'


const BASE_URL = process.env.BASE_URL || `http://localhost:5000`;

export const loadJobsFromAPI = () => {
    return async (dispatch) => {
        try {
            let res = await axios.get(`${BASE_URL}/jobs`);
            console.log(res)
            /* create an object of nested objects with data keyed by id,
            change date format,
            add group property */
            const jobData = {};
            for (let {id, title, start_date, end_date, possible_staff, staff_needed, notes} of res.data.jobs) {
                jobData[id] = {
                    id, title, start_time: moment(start_date), end_time: moment(end_date), possible_staff, staff_needed, notes, group: id
                }
            }
            dispatch(loadJobs(jobData))
        }
        catch(e) {
            console.log(e)
        }
    }
}

export const loadJobs = (jobs) => {
    return {type: LOAD_JOBS, jobs}
}