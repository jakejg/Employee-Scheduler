import axios from 'axios';
import { 
    LOAD_JOBS,
    EDIT_JOB, 
    ADD_JOB
 } from './actionTypes';
import moment from 'moment'
import toLower from '../helpers/lowerCaseProperties';


const BASE_URL = process.env.BASE_URL || `http://localhost:5000`;

export const loadJobsFromAPI = () => {
    return async (dispatch) => {
        try {
            let res = await axios.get(`${BASE_URL}/jobs?comp_id=1`);
            /* create an object of nested objects with data keyed by id,
            change date format,
            add group property */
            const jobData = {};
            // length: moment.duration(end_time - start_time), 
            for (let {id, title, start_date, end_date} of res.data.jobs) {
                let start_time = moment(start_date);
                let end_time = moment(end_date);
                
            jobData[id] = {
                id, 
                title, 
                start_time,
                end_time,
                group: id,
                staff: []
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

export const addJobOnAPI = (jobToAdd) => {
    // add company Id
    jobToAdd.comp_id = 1

    return async (dispatch) => {
        try {
            const res = await axios.post(`${BASE_URL}/jobs`, jobToAdd);
            const {id} = res.data.job;
            dispatch(addJob(id, res.data.job))
        }
        catch(e) {
            console.log(e)
        }
    }
}

export const editJobOnAPI = (ID, jobToEdit) => {
    // change dates to string format for database
    jobToEdit.start_date = moment(jobToEdit.start_time).format();
    jobToEdit.end_date = moment(jobToEdit.end_time).format();
    return async (dispatch) => {
        try {
            await axios.patch(`${BASE_URL}/jobs/${ID}`, jobToEdit);
        }
        catch(e) {
            console.log(e)
        }
    }
}

export const editJob = (id, job) => {
    return {type: EDIT_JOB, id, job}
}

export const getJobFromAPI = (ID) => {
    return async (dispatch) => {
        try {
            let res = await axios.get(`${BASE_URL}/jobs/${ID}`);

            let {id, title, start_date, end_date, possible_staff, staff_needed, notes, staff} = res.data.job
                let start_time = moment(start_date);
                let end_time = moment(end_date);

                let job = {
                    id, 
                    title, 
                    start_time,
                    end_time,
                    possible_staff,
                    staff_needed,
                    notes,
                    staff: staff.map(item => item.id),
                    group: id,
                }
                dispatch(editJob(id, job))
        }
        catch(e) {
            console.log(e)
        }
    }
}

export const addJob = (id, job) => {
    return {type: ADD_JOB, id, job}
}


