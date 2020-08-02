import { 
    LOAD_STAFF,
    EDIT_STAFF,
    ADD_STAFF
 } from './actionTypes';
import { StaffAPI } from '../helpers/StaffApi';

export const loadStaffFromAPI = (comp_id) => {
    return async (dispatch) => {
        try {
            let staffData = await StaffAPI.loadStaff(comp_id);
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
            let staff = await StaffAPI.getStaff(ID)
        
            dispatch(editStaff(staff.id, staff))
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
   
    return async (dispatch) => {
        try {
            const staff = await StaffAPI.addStaff(staffToAdd) ;
            dispatch(addStaff(staff.id, staff))
        }
        catch(e) {
            console.log(e)
        }
    }
}

export const addStaff = (id, staff) => {
    return {type: ADD_STAFF, id, staff}
}