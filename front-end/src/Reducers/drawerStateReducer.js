import {
    CHANGE_DRAWER
} from '../actions/actionTypes';

const dawerStateReducer = (state=false, action) => {
    switch(action.type){
        case CHANGE_DRAWER:
    
            return !state

        default: 
            return state;
    }
}

export default dawerStateReducer;