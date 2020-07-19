import {
    LOAD_JOBS,
    EDIT_JOB,
    ADD_JOB
} from '../actions/actionTypes';

const jobsReducer = (state={}, action) => {
    switch(action.type){
        case LOAD_JOBS:
            // if object exists in store, don't replace it
            for (let id of Object.keys(state)){
                if (action.jobs[id]) {
                    delete action.jobs[id]
                }
            }
            return {...state, ...action.jobs}

        case EDIT_JOB:
                return {...state, 
                    [action.id]: {...action.job, 
                                    staff: [...action.job.staff]}}
            
        case ADD_JOB:
            return {...state, [action.id]: {...action.job}}
    }
    return state
}

export default jobsReducer;