const db = require('../db');
const ExpressError = require('../helpers/expressError');
const bcrypt = require('bcrypt');
const { BCRYPT_WORK_FACTOR } = require('../config');
const moment = require('moment');

class User {
    constructor({id, password, username, email, first_name, last_name, current_wage, years_at_company, is_admin, jobs, comp_id}) {
        this.id = id;
        this.password = password
        this.username = username;
        this.email = email;
        this.first_name = first_name;
        this.last_name = last_name;
        this.current_wage = current_wage
        this.years_at_company = years_at_company;
        this.is_admin = is_admin || false;
        this.jobs = jobs;
        this.comp_id = comp_id;
    }

    /* Method to retrieve overview of all users that aren't admin */

    static async findAll(comp_id) {
        const results = await db.query(
            `SELECT id, username, first_name, last_name FROM users
            WHERE is_admin=false AND comp_id=$1
            ORDER BY first_name`, [comp_id]
        )
        // get list of users currently working
        let workingUsers = await this.findAllWorking(comp_id)
        const working = new Set(workingUsers.map(user => user.id));

        // set isWorking property to true or false for each user based matching id
        results.rows.map(user => {
                user.isWorking = working.has(user.id)
                return user
            })
        
        return results.rows
    }

     /* Method to retrieve all id's of users currenty working */

     static async findAllWorking(comp_id) {

        const results = await db.query(
            `SELECT users.id FROM users
            JOIN users_jobs ON users_jobs.user_id = users.id 
            JOIN jobs ON jobs.id = users_jobs.job_id
            WHERE users.is_admin=false 
            AND users.comp_id=$1 
            AND jobs.start_date < $2
            AND jobs.end_date > $2 
            ORDER BY first_name`, [comp_id, moment()]
        )
        
        return results.rows
    }


    /* Method to retrieve details of one user */

    static async findOne(id) {
        const results = await db.query(
            `SELECT id, 
            username, 
            first_name, 
            last_name,
            email,
            is_admin, 
            current_wage, 
            years_at_company, 
            comp_id 
            FROM users 
            WHERE id=$1`, [id]
        )
        let user = results.rows[0];
        if (!user) throw new ExpressError(`User with id ${id} not found`, 400);

        user.jobs = await this.findJobsForUser(id);
    
        return new User(user);
    }

    /* Method to retrieve all jobs a user has ever worked or is scheduled to work */

    static async findJobsForUser(userId) {
        // join query for users/staff associated with job
        const jobs = await db.query(
            `SELECT jobs.id, jobs.title, jobs.start_date, jobs.end_date FROM jobs 
            JOIN users_jobs ON users_jobs.job_id = jobs.id
            JOIN users ON users.id = users_jobs.user_id
            WHERE users.id = $1`, [userId])
       
        return jobs.rows;
    }

    /* Method to create a new user instance */

    static async create(userData){
        // if user is an admin hash password
        if (userData.is_admin){
            userData.password = await bcrypt.hash(userData.password, BCRYPT_WORK_FACTOR)
        }
        
        return new User(userData); 
    }
    /* Method to update an existing user */

    static async update(id, userData){
        const user = await this.findOne(id);

        // loop through request body data, if the property exists on the user instance, update the instance
        for (let key in userData){
            if (user[key]) {
                user[key] = userData[key];
            }
        }
        return user

    }

    /* Method to find a user's hashed password with a username */

    static async findPassword(username) {
        const results = await db.query(
            `SELECT password from users 
            WHERE username=$1`, [username]
        )
        if (!results.rows[0]) throw new ExpressError(`User with username ${username} not found`, 400);
        
        return results.rows[0].password
    }
     /* Method to authenticate a user */

    static async authenticate(username, password){
        const dbPassword = await this.findPassword(username);

        return await bcrypt.compare(password, dbPassword);
    }

    /* Method to check if username exists*/

    static async checkUsername(username){
        const results = await db.query(
            `SELECT id
            FROM users 
            WHERE username=$1`, [username]
        )
        let user = results.rows[0];
        if (user) return true
        else  return false

}
    // static async checkCompanyName(name){
    //     const results = await db.query(
    //         `SELECT id
    //         FROM companies
    //         WHERE name=$1`, [name]
    //     )
    //     let company = results.rows[0];
    //     console.log(company)
    //     if (company) return true
    //     else return false

     /* Method to find user by username */

     static async findByUsername(username) {
        const results = await db.query(
            `SELECT 
            id, 
            username, 
            first_name, 
            last_name, 
            is_admin,  
            comp_id 
            FROM users 
            WHERE username=$1`, [username]
        )
        let user = results.rows[0];
        if (!user) throw new ExpressError(`User with username ${username} not found`, 400);
    
        return new User(user)
    }


     /* Method to delete a user */

    static async delete(id){
        const user = await this.findOne(id);
        const results = await db.query(
            `DELETE from users 
            WHERE id=$1`, [user.id]
        )

    }

    /* Method to add/update instance of user in the database */

    async save(){
        // if id doesn't yet exist, it is a new user and should be created, otherwise update the user
        if (!this.id) {
            try{
                const results = await db.query(`INSERT INTO users
                (username, password, first_name, last_name, email, current_wage, years_at_company, is_admin, comp_id)
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
                RETURNING id`,
                [this.username, this.password, this.first_name, this.last_name, this.email,
                this.current_wage, this.years_at_company, this.is_admin, this.comp_id]);

                this.id = results.rows[0].id;
            }
            catch(e) {
                console.log(e)
                if (e.code === '23505'){
                    throw new ExpressError("Username already exists", 400)
                }
            }
        }
        else {
            try {
            const results = await db.query(
            `UPDATE users SET username=$2, first_name=$3, last_name=$4, current_wage=$5, years_at_company=$6, is_admin=$7, comp_id=$8, email=$9
            WHERE id=$1`, 
            [this.id, this.username, this.first_name, this.last_name, this.current_wage, this.years_at_company, this.is_admin, this.comp_id, this.email]);
            }
            catch(e){
                console.log(e)
                throw new ExpressError(e.detail)
            }
        }
    }

}

module.exports = User;
