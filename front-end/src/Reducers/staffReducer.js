import {
    LOAD_STAFF,
    EDIT_STAFF
} from '../actions/actionTypes';

const jobsReducer = (state={}, action) => {
    switch(action.type){
        case LOAD_STAFF:
            return {...state, ...action.staff}

        case EDIT_STAFF:
            return {...state, [action.id]: {...action.job}}
    }
    return state
}

export default jobsReducer;