import {BASE_URL} from '../config';
import axios from 'axios';
import { addStaffToJobOnAPI } from '../actions/jobs';
import moment from 'moment'

const token = JSON.parse(localStorage.getItem('token'))

export async function send(verb, endpoint, data={}) {
    // add token to request
    data.token = token
    const res = await axios({
        method: verb,
        url: `${BASE_URL}/${endpoint}`,
        [verb === "get" ? "params" : "data"]: data
    })
    return res.data
}

export class JobAPI {
    static async send(verb, endpoint, data={}) {
        // add token to request
        data.token = token
        const res = await axios({
            method: verb,
            url: `${BASE_URL}/${endpoint}`,
            [verb === "get" ? "params" : "data"]: data
        })
        return res.data
    }

    static async loadJobs(comp_id) {
        let data = await this.send('get', `jobs?comp_id=${comp_id}`);
        /* create an object of nested objects with data keyed by id,
        change date format,
        add group property */
        const jobData = {};
        // length: moment.duration(end_time - start_time), 
        for (let {id, title, start_date, end_date} of data.jobs) {
            let start_time = moment(start_date);
            let end_time = moment(end_date);
            
            jobData[id] = {
                id, 
                title, 
                start_time,
                end_time,
                group: id,
                staff: []
            }
        }
        return jobData;
    }

    static async addJob(jobToAdd) {
         // add company Id
        jobToAdd.comp_id = 1

        let data = await this.send('post', `jobs`, jobToAdd);
        const {id, title, start_date, end_date} = data.job;
        let start_time = moment(start_date);
        let end_time = moment(end_date);
        let job = {
            id, 
            title, 
            start_time,
            end_time,
            group: id,
            staff: []
        }
        return job;
    }

    static async editJob(ID, jobToEdit) {
         // change dates to string format for database
        jobToEdit.start_date = moment(jobToEdit.start_time).format();
        jobToEdit.end_date = moment(jobToEdit.end_time).format();
        await this.send('patch', `jobs/${ID}`, jobToEdit );
    }

    static async getJob(ID){
        let data = await this.send('get', `jobs/${ID}`);

        let {id, title, start_date, end_date, possible_staff, staff_needed, notes, staff} = data.job;
        let start_time = moment(start_date);
        let end_time = moment(end_date);
        let job = {
            id, 
            title, 
            start_time,
            end_time,
            possible_staff,
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
