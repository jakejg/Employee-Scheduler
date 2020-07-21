import jobs from './jobsReducer';
import staff from './staffReducer';
import drawer from './drawerStateReducer';
import { combineReducers } from "redux";

export default combineReducers({jobs, staff, drawer})