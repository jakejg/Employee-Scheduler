import {
    LOAD_STAFF,
    EDIT_STAFF
} from '../actions/actionTypes';

const staffReducer = (state={}, action) => {
    switch(action.type){
        case LOAD_STAFF:
            // if object exists in store, don't replace it
            for (let id of Object.keys(state)){
                if (action.staff[id]) {
                    delete action.staff[id]
                }
            }
            return {...state, ...action.staff}

        case EDIT_STAFF:
            return {...state, 
                    [action.id]: {...action.staff,
                                    past_jobs: [...action.staff.past_jobs],
                                    scheduled_jobs: [...action.staff.scheduled_jobs]
                                }
                    }
    default:
        return state
    }
}

export default staffReducer;