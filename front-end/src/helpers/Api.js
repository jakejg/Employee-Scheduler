import {BASE_URL} from '../config';
import axios from 'axios';

const token = JSON.parse(localStorage.getItem('token'))

export async function send(verb, endpoint, data={}){
        // add token to request
        data.token = token
        console.log(data)
        const res = await axios({
            method: verb,
            url: `${BASE_URL}/${endpoint}`,
            [verb === "get" ? "params" : "data"]: data
        })
        return res.data
    }
    

export async function addCompanyToAPI(name) {
        try {
            let res = await axios.post(`${BASE_URL}/companies`, {name});
            return res.data.company.id
        }
        catch(e) {
            console.log(e)
        }
    }