const db = require('../db');
const ExpressError = require('../helpers/expressError');

class Company {
    constructor({id, name}) {
        this.id = id;
        this.name = name;
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

    static create(name){
        return new Company({name}) 
    }
    /* Method to update an existing company */

    static async update(id, updateObj){
        const company = await this.findOne(id);

        // loop through all properties to update, if the property exists on the company instance, update the instance
        for (let key in updateObj){
            if (company[key]) {
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

    /* Method to add/update instance of company in the database */

    async save(){
        // if id doesn't yet exist, it is a new company and should be created, otherwise update the company
        if (!this.id) {
            try{
                const results = await db.query(`INSERT INTO companies
                (name)
                VALUES ($1)
                RETURNING id`,
                [this.name]);

                this.id = results.rows[0].id;
            }
            catch(e) {
                throw new ExpressError(e)
            }
        }
        else {
             const results = await db.query(
            `UPDATE companies SET name=$2
            WHERE id=$1`, 
            [this.id, this.name ]);
        
        }
    }

}

module.exports = Company;
