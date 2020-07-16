const db = require('../db');
const ExpressError = require('../helpers/expressError');

class Job {
    constructor({id, title, start_date, end_date, possible_staff, staff_needed, notes}) {
        this.id = id;
        this.title = title;
        this.start_date = start_date;
        this.end_date = end_date;
        this.possible_staff = possible_staff
        this.staff_needed = staff_needed;
        this.notes = notes;
    }

    /* Method to retrieve all jobs */

    static async findAll() {
        const results = await db.query(
            `SELECT * FROM jobs
            ORDER BY start_date`
        )
        return results.rows
    }

    static async findOne(id) {
        const results = await db.query(
            `SELECT * from jobs 
            WHERE id=$1`, [id]
        )
        let job = results.rows[0];
        if (!job) throw new ExpressError(`Job with id ${id} not found`, 400);
        else return new Job(job);
    }

    /* Method to retrieve create a ne job instance */

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
                (title, start_date, end_date, possible_staff, staff_needed, notes)
                VALUES ($1, $2, $3, $4, $5, $6)
                RETURNING id`,
                [this.title, this.start_date, this.end_date, this.possible_staff, this.staff_needed, this.notes]);

                this.id = results.rows[0].id;
            }
            catch(e) {
                console.log(e)
                return next(e);
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
