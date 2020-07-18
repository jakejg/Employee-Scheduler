import axios from 'axios';
import { LOAD_JOBS } from './actionTypes';


const BASE_URL = process.env.BASE_URL || `http://localhost:5000`;

export const loadJobsFromAPI = () => {
    return async (dispatch) => {
        try {
            let res = await axios.get(`${BASE_URL}/jobs`);
            console.log(res)
            // create an object of nested objects with data, keyed by id
            const jobData = {};
            for (let {id, title, start_date, end_date, possible_staff, staff_needed, notes} of res.data.jobs) {
                jobData[id] = {
                    id, title, start_date, end_date, possible_staff, staff_needed, notes
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