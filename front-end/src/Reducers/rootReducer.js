import jobs from './jobsReducer';
import staff from './staffReducer';
import { combineReducers } from "redux";

export default combineReducers({jobs, staff})