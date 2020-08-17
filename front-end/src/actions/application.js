import {CHANGE_DRAWER, CHANGE_NO_JOBS, CHANGE_NO_STAFF} from './actionTypes';

export const changeDrawer = () => {
    return {type: CHANGE_DRAWER}
}

export const changeNoJobs = () => {
    return {type: CHANGE_NO_JOBS}
}

export const changeNoStaff = () => {
    return {type: CHANGE_NO_STAFF}
}