import axios from 'axios';
import { 
    ADD_TOKEN
 } from './actionTypes';
import {addCompanyToAPI} from '../helpers/Api'
import {BASE_URL} from '../config';

export const register = (data) => {
    
    // designate admin user
    data.is_admin = true
    
    return async (dispatch) => {
        try {
            // create company
            let companyId = await addCompanyToAPI(data.company_name)
            // associate user with company
            data.comp_id = companyId
            //create admin user
            let res = await axios.post(`${BASE_URL}/auth/register`, data);
            console.log(res.data.token)
            dispatch(addToken(res.data.token));
        }
        catch(e) {
            console.log(e)
        }
    }
}

export const login = () => {
    return async (dispatch) => {
        try {
            let res = await axios.post(`${BASE_URL}/login`);
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
