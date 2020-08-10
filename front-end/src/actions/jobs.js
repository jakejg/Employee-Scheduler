import { 
    LOAD_JOBS,
    EDIT_JOB, 
    ADD_JOB,
    EDIT_JOB_STAFF,
    DELETE_JOB
 } from './actionTypes';
import {JobAPI} from '../helpers/JobApi';

export const loadJobsFromAPI = (comp_id) => {
    return async (dispatch) => {
        try {
            const jobData = await JobAPI.loadJobs(comp_id)
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

    return async (dispatch) => {
        try {
            let job = await JobAPI.addJob(jobToAdd)
            dispatch(addJob(job.id, job))
            return {message: "Job created Successfully", severity: "success"}
        }
        catch(e) {
            console.log(e)
        }
    }
}

export const addJob = (id, job) => {
    return {type: ADD_JOB, id, job}
}


export const getJobFromAPI = (ID) => {
    return async (dispatch) => {
        try {
            let job = await JobAPI.getJob(ID)
            dispatch(editJob(job.id, job))
        }
        catch(e) {
            console.log(e)
            return e.message
        }
    }
}

export const editJobOnAPI = (id, changedProps) => {
    return async (dispatch) => {
        try {
            let job = await JobAPI.editJob(id, changedProps)
            console.log(job)
            dispatch(editJob(job.id, job))
        }
        catch(e) {
            console.log(e)
            return e.message
        }
    }
}

export const editJob = (id, job) => {
    return {type: EDIT_JOB, id, job}
}

export const addStaffToJobOnAPI = (jobId, staffId) => {
    return async (dispatch) => {
        try {
            let data = await JobAPI.addStaffToJob(jobId, staffId)
            console.log(data)
            dispatch(editJobStaff(jobId, data.staffList, data.staff_filled))
            
        }
        catch(e) {
            console.log(e)
        }
    }
}

export const removeStaffFromJobOnAPI = (jobId, staffId) => {
    return async (dispatch) => {
        try {
            let data = await JobAPI.removeStaffFromJob(jobId, staffId)
            dispatch(editJobStaff(jobId, data.staffList, data.staff_filled))
            
        }
        catch(e) {
            console.log(e)
        }
    }
}

export const editJobStaff = (id, staff, staff_filled) => {
    return {type: EDIT_JOB_STAFF, id, staff, staff_filled}
}

export const deleteJobOnAPI = (id) => {
    return async (dispatch) => {
        try {
            let msg = await JobAPI.deleteJob(id)
            dispatch(deleteJob(id))
        }
        catch(e) {
            console.log(e)
            return e.message
        }
    }
}

export const deleteJob = (id) => {
    return {type: DELETE_JOB, id}
}