import axios from 'axios';
import { 
    ADD_OR_REMOVE_TOKEN
 } from './actionTypes';
import {addCompanyToAPI} from '../helpers/JobApi'
import {BASE_URL} from '../config';


export const register = (data) => {
    
    return async (dispatch) => {
        try {
            // designate admin user
            data.is_admin = true
            // create admin user
       
            const res = await axios.post(`${BASE_URL}/auth/register`, data);
       
            dispatch(addOrRemoveToken(res.data.token));
        }
        catch(e) {
            console.log(e)
        }
    }
}

export const login = (data) => {
    return async (dispatch) => {
        try {
            let res = await axios.post(`${BASE_URL}/auth/login`, data);
            dispatch(addOrRemoveToken(res.data.token));
        }
        catch(e) {
            // console.log(e.response.data.message)
            return e.response.data.message
        }
    }
}

export const addOrRemoveToken = (token) => {
    return {type: ADD_OR_REMOVE_TOKEN, token}
}
