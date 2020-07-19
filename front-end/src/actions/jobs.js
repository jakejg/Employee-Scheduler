import axios from 'axios';
import { 
    LOAD_JOBS,
    EDIT_JOB
 } from './actionTypes';
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
                let start_time = moment(start_date);
                let end_time = moment(end_date);

                jobData[id] = {
                    id, 
                    title, 
                    start_time,
                    end_time,
                    length: moment.duration(end_time - start_time), 
                    possible_staff, 
                    staff_needed, notes, 
                    group: id
                }
            }
      
            dispatch(loadJobs(jobData));
        }
        catch(e) {
            console.log(e)
        }
    }
}

export const loadJobs = (jobs) => {
    return {type: LOAD_JOBS, jobs}
}

export const editJobOnAPI = (ID, jobToEdit) => {
    // change dates to string format for database
    jobToEdit.start_date = moment(jobToEdit.start_time).format();
    jobToEdit.end_date = moment(jobToEdit.end_time).format();
    return async (dispatch) => {
        try {
            let res = await axios.patch(`${BASE_URL}/jobs/${ID}`, jobToEdit);
            console.log(res.data)
            // let {id, title, start_date, end_date, possible_staff, staff_needed, notes} = res.data.job;
            // // /* create an object of nested objects with data keyed by id,
            // // change date format,
            // // add group property */
            // const job = {id, title, start_time: moment(start_date), end_time: moment(end_date), possible_staff, staff_needed, notes, group: id};
          
            // dispatch(editJob(id, job))
        }
        catch(e) {
            console.log(e)
        }
    }
}

export const editJob = (id, job) => {
    return {type: EDIT_JOB, id, job}
}