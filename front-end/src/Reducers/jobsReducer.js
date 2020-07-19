import {
    LOAD_JOBS,
    EDIT_JOB
} from '../actions/actionTypes';

const jobsReducer = (state={}, action) => {
    switch(action.type){
        case LOAD_JOBS:
            return {...state, ...action.jobs}

        case EDIT_JOB:
            return {...state, [action.id]: {...action.job}}
    }
}

export default jobsReducer;