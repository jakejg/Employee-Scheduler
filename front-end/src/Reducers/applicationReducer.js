import {
    CHANGE_DRAWER,
    ADD_OR_REMOVE_TOKEN,
    CHANGE_NO_JOBS,
    CHANGE_NO_STAFF
} from '../actions/actionTypes';

let INITIAL_STATE = {
                        drawer: false, 
                        token: JSON.parse(localStorage.getItem('token')),
                        noJobs: false,
                        noStaff: false
                    }

const applicationReducer = (state=INITIAL_STATE, action) => {
    switch(action.type){
        case CHANGE_DRAWER:
    
            return {...state, drawer: !state.drawer}

        case ADD_OR_REMOVE_TOKEN:
            // update local storage

            localStorage.setItem('token', JSON.stringify(action.token))
            return {...state, token: action.token}

        case CHANGE_NO_JOBS:
            return {...state, noJobs: !state.noJobs }

        case CHANGE_NO_STAFF: 
            return {...state, noStaff: !state.noStaff }

        default: 
            return state;
    }
}

export default applicationReducer;