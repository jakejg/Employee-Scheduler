import axios from 'axios';
import { 
    LOAD_STAFF,
    EDIT_STAFF,
    ADD_STAFF
 } from './actionTypes';
import sortJobs from '../helpers/sortStaffJobs'
import {BASE_URL} from '../config';

export const loadStaffFromAPI = (comp_id) => {
    return async (dispatch) => {
        try {
            let res = await axios.get(`${BASE_URL}/users?comp_id=${comp_id}`);
            /* create an object of nested objects with data keyed by id */
            const staffData = {};
            for (let {id, username, first_name, last_name, isWorking} of res.data.users) {

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
            let res = await axios.get(`${BASE_URL}/users/${ID}`);
            let {id, username, first_name, last_name, current_wage, years_at_company, jobs} = res.data.user

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
                console.log(staff)
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
            const res = await axios.post(`${BASE_URL}/users`, staffToAdd);
          
            const {id, username, first_name, last_name} = res.data.user;
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