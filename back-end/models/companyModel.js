const db = require('../db');
const ExpressError = require('../helpers/expressError');
const CalendarAPI = require('../helpers/calendarAPI');

class Company {
    constructor({id, name, calendar_id}) {
        this.id = id;
        this.name = name;
        this.calendar_id = calendar_id;
    }


    /* Method to retrieve details for one company */

    static async findOne(id) {
        const results = await db.query(
            `SELECT * from companies 
            WHERE id=$1`, [id]
        )
        let company = results.rows[0];
        if (!company) throw new ExpressError(`Company with id ${id} not found`, 400);

        return new Company(company);
    }

    /* Method to create a new company instance */

    static async create(name){
        const calendar_id = await CalendarAPI.createCalendar(name)
        return new Company({name, calendar_id}) 
    }
    /* Method to update an existing company */

    static async update(id, updateObj){
        const company = await this.findOne(id);

        // loop through all properties to update, if the property exists on the company instance, update the instance
        for (let key in updateObj){
            if (company[key] !== undefined) {
                company[key] = updateObj[key];
            }
        }
        return company

    }

    static async delete(id){
        const company = await this.findOne(id);
        const results = await db.query(
            `DELETE from companies 
            WHERE id=$1`, [company.id]
        )

    } 

    /* Method to get the calendar id for a company*/

    static async getCalendarID(comp_id){
        const results = await db.query(
            `SELECT calendar_id from companies
            WHERE id=$1`, [comp_id]
        )
        return results.rows[0].calendar_id
    }

    /* Method to check if a company name exists*/

    static async checkCompanyName(name){
        const results = await db.query(
            `SELECT id
            FROM companies
            WHERE name=$1`, [name]
        )
        let company = results.rows[0];
  
        if (company) return true
        else return false
    }
    
    /* Method to create a calendar for an existing company if a calendar does not exist*/

    static async checkCalendar(id){
        const calendarId = await this.getCalendarID(id);
        if (!calendarId) {
            const company = await this.findOne(id);
            const calendar_id = await CalendarAPI.createCalendar(company.name);
            const updatedCompany = await this.update(company.id, {calendar_id});
            updatedCompany.save();
        }
    }

    /* Method to add/update instance of company in the database */

    async save(){
        // if id doesn't yet exist, it is a new company and should be created, otherwise update the company
        if (!this.id) {
            try{
                const results = await db.query(`INSERT INTO companies
                (name, calendar_id)
                VALUES ($1, $2)
                RETURNING id`,
                [this.name, this.calendar_id]);

                this.id = results.rows[0].id;
            }
            catch(e) {
                console.log(e)
                if (e.code === '23505'){
                    throw new ExpressError("A company with that name already exists", 400)
                }
            }
        }
        else {
             const results = await db.query(
            `UPDATE companies SET name=$2, calendar_id=$3
            WHERE id=$1`, 
            [this.id, this.name, this.calendar_id]);
        
        }
    }

}

module.exports = Company;
