import {LOAD_JOBS} from '../actions/actionTypes';

const jobsReducer = (state={}, action) => {
    switch(action.type){
        case LOAD_JOBS:
            return {...state, ...action.jobs}
    }
}

export default jobsReducer;