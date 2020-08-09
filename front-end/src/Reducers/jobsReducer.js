import {
    LOAD_JOBS,
    EDIT_JOB,
    ADD_JOB,
    EDIT_JOB_STAFF
} from '../actions/actionTypes';

const jobsReducer = (state={}, action) => {
    switch(action.type){
        case LOAD_JOBS:
            return {...state, ...action.jobs}

        case EDIT_JOB:
                return {...state, 
                    [action.id]: {...action.job, 
                                    staff: [...action.job.staff]}}
        case EDIT_JOB_STAFF:
            return {...state, 
                [action.id]: {...state[action.id],
                                staff_filled: action.staff_filled, 
                                staff: [...action.staff]}}                      
            
        case ADD_JOB:
            return {...state, [action.id]: {...action.job}}
    
        default:
            return state
    }
}

export default jobsReducer;