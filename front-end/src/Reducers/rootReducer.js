import jobs from './jobsReducer';
import staff from './staffReducer';
import application from './applicationReducer';
import { combineReducers } from "redux";
import {LOG_OUT} from '../actions/actionTypes';


const appReducer = combineReducers({jobs, staff, application})

const rootReducer = (state, action) => {
    if (action.type === LOG_OUT){
       
        state = undefined;
        return state;
    }

    return appReducer(state, action)
}

export default rootReducer;

