import {BASE_URL} from '../config';
import axios from 'axios';
import moment from 'moment'
import {decode} from 'jsonwebtoken';



export class JobAPI {
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

    static async loadJobs(comp_id) {
        let data = await this.send('get', `jobs?comp_id=${comp_id}`);
        /* create an object of nested objects with data keyed by id,
        change date format,
        add group property */
        const jobData = {};
        // length: moment.duration(end_time - start_time), 
        for (let {id, title, start_date, end_date, status} of data.jobs) {
            let start_time = moment(start_date);
            let end_time = moment(end_date);
            
            jobData[id] = {
                id, 
                title, 
                start_time,
                end_time,
                group: id,
                staff: [],
                status
            }
        }
        return jobData;
    }

    static async addJob(jobToAdd) {
        const token = JSON.parse(localStorage.getItem('token'));
        const {comp_id} = decode(token);
         // add company Id
        jobToAdd.comp_id = comp_id;

        let data = await this.send('post', `jobs`, jobToAdd);
        const {id, title, start_date, end_date, status} = data.job;
        let start_time = moment(start_date);
        let end_time = moment(end_date);
        let job = {
            id, 
            title, 
            start_time,
            end_time,
            group: id,
            staff: [],
            status
        }
        return job;
    }

    static async getJob(ID){
        let data = await this.send('get', `jobs/${ID}`);

        let {id, title, start_date, end_date, status, staff_needed, notes, staff} = data.job;
        let start_time = moment(start_date);
        let end_time = moment(end_date);
        let job = {
            id, 
            title, 
            start_time,
            end_time,
            status,
            staff_needed,
            notes,
            staff,
            group: id,
        }
        return job;
    }

    static async editJob(ID, jobToEdit){
         // change dates to string format for database
        console.log(jobToEdit)
        jobToEdit.start_date = moment(jobToEdit.start_time).format();
        jobToEdit.end_date = moment(jobToEdit.end_time).format();
        console.log(jobToEdit)
        let data = await this.send('patch', `jobs/${ID}`, jobToEdit);
        let {id, title, start_date, end_date, status, staff_needed, notes, staff} = data.job;
        let start_time = moment(start_date);
        let end_time = moment(end_date);
        let job = {
            id, 
            title, 
            start_time,
            end_time,
            status,
            staff_needed,
            notes,
            staff,
            group: id,
        }
        return job;
    }

    static async addStaffToJob(jobId, staffId){
        let data = await this.send('post', `jobs/${jobId}/add_staff`, {user_id: staffId});
        return data
    }

    static async removeStaffFromJob(jobId, staffId){
        let data = await this.send('post', `jobs/${jobId}/remove_staff`, {user_id: staffId});
        return data
    }

    static async deleteJob(ID){
        let data = await this.send('delete', `jobs/${ID}`);
        return data
    }
}

    
