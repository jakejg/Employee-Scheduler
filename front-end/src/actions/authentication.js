import axios from 'axios';
import { 
    ADD_TOKEN
 } from './actionTypes';
import {addCompanyToAPI} from '../helpers/Api'
import {BASE_URL} from '../config';

export const register = (data) => {
    
    return async (dispatch) => {
        try {
            // create company
            let companyId = await addCompanyToAPI(data.company_name)
            // associate user with company
            data.comp_id = companyId
            // designate admin user
            data.is_admin = true
            //create admin user
            let res = await axios.post(`${BASE_URL}/auth/register`, data);
        
            dispatch(addToken(res.data.token));
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
            dispatch(addToken(res.data.token));
        }
        catch(e) {
            console.log(e)
        }
    }
}

export const addToken = (token) => {
    return {type: ADD_TOKEN, token}
}
