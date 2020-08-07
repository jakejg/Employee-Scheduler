import {BASE_URL} from '../config';
import axios from 'axios';

export class CompanyAPI {
    static async send(verb, endpoint, data={}) {
        const token = JSON.parse(localStorage.getItem('token')) 
        // add token to request
        data.token = token
        try{
            const res = await axios({
                method: verb,
                url: `${BASE_URL}/${endpoint}`,
                [verb === "get" ? "params" : "data"]: data
            })
            return res.data
        }
        catch(e){
            console.log(e.response.data)
            return e.response.data
        }
    }

    static async getCompany(comp_id) {
        let data = await this.send('get', `companies/${comp_id}`);
        return data.company;
    }
}