const db = require('../db');
const ExpressError = require('../helpers/expressError');
const CalendarAPI = require('../helpers/calendarAPI');
const Company = require('./companyModel');
const User = require('./usersModel');

class Job {
    constructor({id, title, start_date, end_date, status, staff_needed, notes, staff, comp_id, calendar_event_id}) {
        this.id = id;
        this.title = title;
        this.start_date = start_date;
        this.end_date = end_date;
        this.status = status || 'under';
        this.staff_needed = staff_needed;
        this.notes = notes;
        this.staff= staff;
        this.comp_id = comp_id;
        this.calendar_event_id = calendar_event_id
    }

    /* Method to retrieve an overview of all jobs */

    static async findAll(comp_id) {
       
        const results = await db.query(
            `SELECT id, title, start_date, end_date, status FROM jobs 
            WHERE comp_id=$1
            ORDER BY start_date`, [comp_id]
        )
        
        const jobs = results.rows;
        
        for (let job of jobs){
            job.staff = await this.findAllStaffWorkingJob(job.id)
        }
        
        return jobs
    }

    /* Method to retrieve details for one job */

    static async findOne(id) {
        const results = await db.query(
            `SELECT * from jobs 
            WHERE id=$1`, [id]
        )
        let job = results.rows[0];
        if (!job) throw new ExpressError(`Job with id ${id} not found`, 400);

        job.staff = await this.findAllStaffWorkingJob(id);

        return new Job(job);
    }

    /* Method to retrieve all staff assigned to a job */

    static async findAllStaffWorkingJob(jobId) {
        // join query for users/staff associated with job
        const staff = await db.query(
            `SELECT users.id, users.first_name, users.last_name, users.current_wage, users.email FROM users 
            JOIN users_jobs ON users_jobs.user_id = users.id 
            JOIN jobs ON jobs.id = users_jobs.job_id
            WHERE jobs.id = $1`, [jobId])
        
        return staff.rows;
    }


    /* Method to create a new job instance */

    static async create(jobObj){
        // get calendar_id from database
        const calendar_id = await Company.getCalendarID(jobObj.comp_id);
        // create calendar event on microsft graph api and add id to job object
        jobObj.calendar_event_id = await CalendarAPI.createEvent(calendar_id, jobObj);
        return new Job(jobObj) 
    }
    /* Method to update an existing job */

    static async update(id, updateObj={}, updateCalendar=false){
        const job = await this.findOne(id);
         // update job status
        if (job.staff.length > (updateObj.staff_needed || job.staff_needed)) {
            updateObj.status = 'over'
        }
        else if (job.staff.length < (updateObj.staff_needed || job.staff_needed)) {
            updateObj.status = 'under'
        }
        else { 
            updateObj.status = 'filled'
        }

         
        // loop through all properties to update, if the property exists on the job instance, update the instance
        for (let key in updateObj){
            // check if calendar needs to be updated
            if ((key === 'title' || key === 'start_date' || key === 'end_date') && updateObj[key] !== job[key]){
                updateCalendar = true
            }
            if (job[key] !== undefined) {
                job[key] = updateObj[key];
            }
        }
        
        // update calendar if needed
        if (updateCalendar){
            const calendar_id = await Company.getCalendarID(job.comp_id)
            CalendarAPI.updateEventDetails(calendar_id, job.calendar_event_id, job)
        }

        return job

    }

     /* Method to delete an existing job */

    static async delete(id){
        const job = await this.findOne(id);
        const results = await db.query(
            `DELETE from jobs 
            WHERE id=$1`, [job.id]
        )
    }

     /* Method to associate a staff with an existing job, returns the new staff list */

    static async addStaff(job_id, user_id){
        await db.query(`INSERT INTO users_jobs
        (job_id, user_id)
        VALUES ($1, $2)
        RETURNING id`,
        [job_id, user_id]);
      
        const staffList = await this.findAllStaffWorkingJob(job_id);
        return staffList

    }

     /* Method to de-associate a staff with an existing job, returns the new staff list */

     static async removeStaff(job_id, user_id){
        await db.query(`
        DELETE FROM users_jobs
        WHERE job_id=$1 AND user_id=$2`,
        [job_id, user_id]);

        const staffList = await this.findAllStaffWorkingJob(job_id);
        return staffList
    }

    /* Method to call update calendar event, which adds or removes a job/event from a staff's microsoft calendar*/

    static async sendOrCancelCalendarInvite(jobId, staffList){
        const job = await this.findOne(jobId);
        const calendar_id = await Company.getCalendarID(job.comp_id)
        // if calendar_event_id does not exist for a job create one
        if (!job.calendar_event_id){
            // create calendar event on microsft graph api and add id to job object
            job.calendar_event_id = await CalendarAPI.createEvent(calendar_id, job);
            const updatedJob = await Job.update(job.id, job);
            updatedJob.save();
        }
        CalendarAPI.updateEventAttendees(calendar_id, job.calendar_event_id, staffList)
    }

    /* Method to add/update instance of job in the database */

    async save(){
        // if id doesn't yet exist, it is a new job and should be created, otherwise update the job
        if (!this.id) {
            try{
                const results = await db.query(`INSERT INTO jobs
                (title, start_date, end_date, status, staff_needed, notes, comp_id, calendar_event_id)
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
                RETURNING id`,
                [this.title, this.start_date, this.end_date, this.status, this.staff_needed, this.notes, this.comp_id, this.calendar_event_id]);

                this.id = results.rows[0].id;
            }
            catch(e) {
                console.log(e)
            }
        }
        else {
             const results = await db.query(
            `UPDATE jobs SET title=$2, start_date=$3, end_date=$4, status=$5, staff_needed=$6, notes=$7, calendar_event_id=$8
            WHERE id=$1`, 
            [this.id, this.title, this.start_date, this.end_date, this.status, this.staff_needed, this.notes, this.calendar_event_id]);
        
        }
    }

}

module.exports = Job;
