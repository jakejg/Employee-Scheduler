import {
    CHANGE_DRAWER,
    ADD_TOKEN
} from '../actions/actionTypes';

const applicationReducer = (state={drawer: false, token:""}, action) => {
    switch(action.type){
        case CHANGE_DRAWER:
    
            return {...state, drawer: !state.drawer}

        case ADD_TOKEN:
    
            return {...state, token: action.token}

        default: 
            return state;
    }
}

export default applicationReducer;