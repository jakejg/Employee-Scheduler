import {BASE_URL} from '../config';
import axios from 'axios';
import sortJobs from '../helpers/sortStaffJobs'
import {decode} from 'jsonwebtoken';


export class StaffAPI {
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

    static async loadStaff(comp_id){
        let data = await this.send('get', `users?comp_id=${comp_id}`);
        /* create an object of nested objects with data keyed by id */
        const staffData = {};
        for (let {id, username, first_name, last_name, isWorking} of data.users) {

            staffData[id] = {
                id,
                username,
                first_name,
                last_name,
                isWorking,
                past_jobs: [],
                scheduled_jobs: []
            }
        }
        return staffData;
    }

    static async getStaff(ID){
        let data = await this.send('get', `users/${ID}`);
            let {id, username, first_name, last_name, current_wage, years_at_company, jobs} = data.user

            let staff = {
                    id,
                    username,
                    first_name,
                    last_name,
                    current_wage, 
                    years_at_company,
                    current_job:  sortJobs(jobs).current,
                    past_jobs: sortJobs(jobs).past,
                    scheduled_jobs: sortJobs(jobs).future
                }
        return staff;
    }

    static async addStaff(staffToAdd){
        const token = JSON.parse(localStorage.getItem('token'))
        const {comp_id} = decode(token);
          // add company Id
        staffToAdd.comp_id = comp_id
         // specify new staff is not an admin
        staffToAdd.is_admin = false;

        const data = await this.send('post', `users`, staffToAdd);    
        const {id, username, first_name, last_name} = data.user;
        const staff = {id, username, first_name, last_name, past_jobs: [], scheduled_jobs: []}
        return staff;
    }
}
