import axios from 'axios';
import { 
    LOAD_STAFF,
    EDIT_STAFF,
    ADD_STAFF
 } from './actionTypes';
import sortJobs from '../helpers/sortStaffJobs'
import {BASE_URL} from '../config';
import { send } from '../helpers/Api';

export const loadStaffFromAPI = (comp_id) => {
    return async (dispatch) => {
        try {
            let data = await send('get', `users?comp_id=${comp_id}`);
            /* create an object of nested objects with data keyed by id */
            const staffData = {};
            for (let {id, username, first_name, last_name, isWorking} of data.users) {

                staffData[id] = {
                    id,
                    username,
                    first_name,
                    last_name,
                    isWorking,
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
            let data = await send('get', `users/${ID}`);
            let {id, username, first_name, last_name, current_wage, years_at_company, jobs} = data.user

            let staff = {
                    id,
                    username,
                    first_name,
                    last_name,
                    current_wage, 
                    years_at_company,
                    current_job:  sortJobs(jobs).current,
                    past_jobs: sortJobs(jobs).past,
                    scheduled_jobs: sortJobs(jobs).future
                }
                dispatch(editStaff(id, staff))
            }
        catch(e) {
            console.log(e)
        }
    }
}

export const editStaff = (id, staff) => {
    return {type: EDIT_STAFF, id, staff}
}

export const addStaffOnAPI = (staffToAdd) => {
    // add company Id
    staffToAdd.comp_id = 1;
    // specify new staff is not an admin
    staffToAdd.is_admin = false;

    return async (dispatch) => {
        try {
            let data = await send('post', `users`, staffToAdd);    
            const {id, username, first_name, last_name} = data.user;
            dispatch(addStaff(id, {id, username, first_name, last_name, past_jobs: [], scheduled_jobs: []}))
        }
        catch(e) {
            console.log(e)
        }
    }
}

export const addStaff = (id, staff) => {
    return {type: ADD_STAFF, id, staff}
}