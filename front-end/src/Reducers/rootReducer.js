import jobs from './jobsReducer';
import staff from './staffReducer';
import application from './applicationReducer';
import { combineReducers } from "redux";

export default combineReducers({jobs, staff, application})