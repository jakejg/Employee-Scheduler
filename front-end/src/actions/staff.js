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
            for (let {id, password, username, first_name, last_name, current_wage, years_at_company, is_admin} of res.data.users) {

                staffData[id] = {
                    id,
                    password,
                    username,
                    first_name,
                    last_name,
                    current_wage,
                    years_at_company,
                    is_admin
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
    return {type: EDIT_STAFF, id, job}
}