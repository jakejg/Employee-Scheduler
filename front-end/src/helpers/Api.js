import {BASE_URL} from '../config';
import axios from 'axios';

export async function addCompanyToAPI(name) {
        try {
            let res = await axios.post(`${BASE_URL}/companies`, {name});
            return res.data.company.id
        }
        catch(e) {
            console.log(e)
        }
    }