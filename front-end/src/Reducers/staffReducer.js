import {
    LOAD_STAFF,
    EDIT_STAFF,
    ADD_STAFF,
    DELETE_STAFF
} from '../actions/actionTypes';

const staffReducer = (state={}, action) => {
    switch(action.type){
        case LOAD_STAFF:
            return {...action.staff}

        case EDIT_STAFF:
            return {...state, 
                    [action.id]: { 
                                    ...action.staff,
                                    past_jobs: [...action.staff.past_jobs],
                                    scheduled_jobs: [...action.staff.scheduled_jobs]
                                }
                    }
        case ADD_STAFF:
            return {...state, [action.id]: {...action.staff}}

        case DELETE_STAFF:
            let staff = { ...state };
            delete staff[action.id];
            return staff
    default:
        return state
    }
}

export default staffReducer;