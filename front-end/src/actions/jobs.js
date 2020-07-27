import axios from 'axios';
import { 
    LOAD_JOBS,
    EDIT_JOB, 
    ADD_JOB,
    EDIT_JOB_STAFF
 } from './actionTypes';
import moment from 'moment'
import {BASE_URL} from '../config';
import {send} from '../helpers/Api';

export const loadJobsFromAPI = (comp_id) => {
    return async (dispatch) => {
        try {
            let data = await send('get', `jobs?comp_id=${comp_id}`);
            /* create an object of nested objects with data keyed by id,
            change date format,
            add group property */
            const jobData = {};
            // length: moment.duration(end_time - start_time), 
            for (let {id, title, start_date, end_date} of data.jobs) {
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
            let data = await send('post', `jobs`, jobToAdd);
            const {id, title, start_date, end_date} = data.job;
            let start_time = moment(start_date);
            let end_time = moment(end_date);
            dispatch(addJob(id, {
                id, 
                title, 
                start_time,
                end_time,
                group: id,
                staff: []
            }))
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
            await send('patch', `jobs/${ID}`, jobToEdit );
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
            let data = await send('get', `jobs/${ID}`);

            let {id, title, start_date, end_date, possible_staff, staff_needed, notes, staff} = data.job;
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
                    staff,
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


export const addStaffToJobOnAPI = (jobId, staffId) => {
    return async (dispatch) => {
        try {
            let data = await send('post', `jobs/${jobId}/add_staff`, {user_id: staffId});
            dispatch(editJobStaff(jobId, data.staff))
            
        }
        catch(e) {
            console.log(e)
        }
    }
}

export const removeStaffFromJobOnAPI = (jobId, staffId) => {
    return async (dispatch) => {
        try {
            let data = await send('post', `jobs/${jobId}/remove_staff`, {user_id: staffId});
            dispatch(editJobStaff(jobId, data.staff))
            
        }
        catch(e) {
            console.log(e)
        }
    }
}

export const editJobStaff = (id, staff) => {
    return {type: EDIT_JOB_STAFF, id, staff}
}