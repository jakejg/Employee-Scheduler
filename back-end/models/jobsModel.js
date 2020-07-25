const db = require('../db');
const ExpressError = require('../helpers/expressError');

class Job {
    constructor({id, title, start_date, end_date, possible_staff, staff_needed, notes, staff, comp_id}) {
        this.id = id;
        this.title = title;
        this.start_date = start_date;
        this.end_date = end_date;
        this.possible_staff = possible_staff
        this.staff_needed = staff_needed;
        this.notes = notes;
        this.staff= staff;
        this.comp_id = comp_id;
    }

    /* Method to retrieve an overview of all jobs */

    static async findAll(comp_id) {
        console.log(comp_id)
        const results = await db.query(
            `SELECT id, title, start_date, end_date FROM jobs 
            WHERE comp_id=$1
            ORDER BY start_date`, [comp_id]
        )
        return results.rows
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
            `SELECT users.id, users.first_name FROM users 
            JOIN users_jobs ON users_jobs.user_id = users.id 
            JOIN jobs ON jobs.id = users_jobs.job_id
            WHERE jobs.id = $1`, [jobId])
        
        return staff.rows;
    }

    /* Method to create a new job instance */

    static create(jobObj){
        return new Job(jobObj) 
    }
    /* Method to update an existing job */

    static async update(id, updateObj){
        const job = await this.findOne(id);

        // loop through all properties to update, if the property exists on the job instance, update the instance
        for (let key in updateObj){
            if (job[key]) {
                job[key] = updateObj[key];
            }
        }
        return job

    }

    static async delete(id){
        const job = await this.findOne(id);
        const results = await db.query(
            `DELETE from jobs 
            WHERE id=$1`, [job.id]
        )

    }

    /* Method to add/update instance of job in the database */

    async save(){
        // if id doesn't yet exist, it is a new job and should be created, otherwise update the job
        if (!this.id) {
            try{
                const results = await db.query(`INSERT INTO jobs
                (title, start_date, end_date, possible_staff, staff_needed, notes, comp_id)
                VALUES ($1, $2, $3, $4, $5, $6, $7)
                RETURNING id`,
                [this.title, this.start_date, this.end_date, this.possible_staff, this.staff_needed, this.notes, this.comp_id]);

                this.id = results.rows[0].id;
            }
            catch(e) {
                console.log(e)
            }
        }
        else {
             const results = await db.query(
            `UPDATE jobs SET title=$2, start_date=$3, end_date=$4, possible_staff=$5, staff_needed=$6, notes=$7
            WHERE id=$1`, 
            [this.id, this.title, this.start_date, this.end_date, this.possible_staff, this.staff_needed, this.notes]);
        
        }
    }

}

module.exports = Job;
