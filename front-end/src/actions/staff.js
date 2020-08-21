import { 
    LOAD_STAFF,
    EDIT_STAFF,
    ADD_STAFF,
    DELETE_STAFF
 } from './actionTypes';
import { StaffAPI } from '../api/StaffApi';

export const loadStaffFromAPI = (comp_id) => {
    return async (dispatch) => {
        try {
            let staffData = await StaffAPI.loadStaff(comp_id);
            dispatch(loadStaff(staffData));
            if (!Object.keys(staffData).length){
                return "No staff found"
            }
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
            return e.message

        }
    }
}

export const editStaffOnAPI = (id, changedProperties) => {

    return async (dispatch) => {
        try {
            const staff = await StaffAPI.editStaff(id, changedProperties);
            dispatch(editStaff(staff.id, staff))
        }
        catch(e) {
            console.log(e.message)
        }
    }
}

export const editStaff = (id, staff) => {
    return {type: EDIT_STAFF, id, staff}
}

export const addStaffOnAPI = (staffToAdd) => {
   
    return async (dispatch) => {
        try {
            const staff = await StaffAPI.addStaff(staffToAdd);
            dispatch(addStaff(staff.id, staff))
            return {message: "Staff created Successfully", severity: "success"}
        }
        catch(e) {
            console.log(e.message)
            return {message: e.message, severity: "error"}
        }
    }
}

export const addStaff = (id, staff) => {
    return {type: ADD_STAFF, id, staff}
}

export const deleteStaffOnAPI = (ID) => {
    return async (dispatch) => {
        try {
            await StaffAPI.deleteStaff(ID)
        
            dispatch(deleteStaff(ID))
            
            }
        catch(e) {
            console.log(e)
            return e.message

        }
    }
}

export const deleteStaff = (id) => {
    return {type: DELETE_STAFF, id}
}
