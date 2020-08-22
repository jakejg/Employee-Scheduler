const db = require('./db');
const moment = require('moment');

(async function(){

// reset demo job data
async function resetJobs() {
    try{
        await db.query(`DELETE FROM jobs
        WHERE comp_id=$1`,
        [1])

        await db.query(`INSERT INTO jobs
        (title, start_date, end_date, staff_needed, notes, comp_id, status, calendar_event_id)
        VALUES  
        ($1, $2, $3, $4, $5, $6, $7, $8),
        ($9, $10, $11, $12, $13, $14, $15, $16),
        ($17, $18, $19, $20, $21, $22, $23, $24)`,
        [
        '15 day Mountain', moment().add(5, 'day').format(), moment().add(20, 'day').format(), 1, 'Need to get new backpacks', 1, 'filled', 'AAMkAGZlYTI0YjJjLTg2ZjEtNDliNC1hMzEyLTRjZWQ1MTUxZDY0YgBGAAAAAADeU7Uxc9NWSb0_KQxp3SxZBwDOkpB1ICt6TpndDjvJOZEqAAAB5y1mAADOkpB1ICt6TpndDjvJOZEqAAAB54uaAAA=',
        '20 day River', moment().add(-2, 'day').format(), moment().add(18, 'day').format(), 2, 'Desolation Canyon', 1, 'filled', 'AAMkAGZlYTI0YjJjLTg2ZjEtNDliNC1hMzEyLTRjZWQ1MTUxZDY0YgBGAAAAAADeU7Uxc9NWSb0_KQxp3SxZBwDOkpB1ICt6TpndDjvJOZEqAAAB5y1mAADOkpB1ICt6TpndDjvJOZEqAAAB54uZAAA=',
        '30 day Canyon', moment().add(1, 'day').format(), moment().add(31, 'day').format(), 2, 'Do not use new backpacks', 1, 'under' , 'AAMkAGZlYTI0YjJjLTg2ZjEtNDliNC1hMzEyLTRjZWQ1MTUxZDY0YgBGAAAAAADeU7Uxc9NWSb0_KQxp3SxZBwDOkpB1ICt6TpndDjvJOZEqAAAB5y1mAADOkpB1ICt6TpndDjvJOZEqAAAB54uYAAA='
        ]);
    }
    catch(e){
        console.log(e)
    }
} 

// reset demo staff
async function resetStaff(){
    try{
        await db.query(`DELETE FROM users
        WHERE comp_id=$1 AND username NOT IN($2)`,
        [1, 'Demo'])

        await db.query(`INSERT INTO users
        (username, email, first_name, last_name, current_wage, years_at_company, comp_id)
        VALUES  
        ($1, $2, $3, $4, $5, $6, $7),
        ($8, $9, $10, $11, $12, $13, $14),
        ($15, $16, $17, $18, $19, $20, $21),
        ($22, $23, $24, $25, $26, $27, $28)`,
        [
        'jon@fakemail.com', 'jon@fakemail.com', 'Jon', 'Martin', 130, 3, 1,
        'sarah@fakemail.com', 'sarah@fakemail.com', 'Sarah', 'Brown', 130, 2, 1,
        'kim@fakemail.com', 'kim@fakemail.com', 'Kim', 'Miller', 120, 1, 1,
        'stacy@fakemail.com', 'stacy@fakemail.com', 'Stacy', 'Lopez', 160, 4, 1
        ]);
    }
    catch(e){
        console.log(e)
    }
}

// reset associations
async function resetJoinTable(){
    try{
        // get job ids        
        const r1 = await db.query(
            `SELECT id, title from jobs
            WHERE title IN ($2, $3) AND comp_id=$1`,
            [1, '15 day Mountain', '20 day River']
        )
        let mtn;
        let river;

        for (let job of r1.rows){
            if (job.title === '15 day Mountain'){
                mtn = job.id
            }
            else if (job.title === '20 day River'){
                river = job.id
            }
        }
     
        // get user ids        
        const r2 = await db.query(
            `SELECT id, first_name from users 
            WHERE first_name IN ($1, $2, $3) AND comp_id=$4`, 
            ['Stacy', 'Jon', 'Kim', 1]
        )
        let stacy;
        let kim;
        let jon;

        for (let staff of r2.rows){
            if (staff.first_name === 'Stacy'){
                stacy = staff.id
            }
            else if (staff.first_name === 'Jon'){
                jon = staff.id
            }
            else if (staff.first_name === 'Kim'){
                kim = staff.id
            }
        }

        await db.query(`INSERT INTO users_jobs
        (job_id, user_id)
        VALUES  
        ($1, $2),
        ($3, $4),
        ($3, $5)`,
        [
        mtn, jon,
        river, stacy,
        kim
        ]);

    }
    catch(e){
        console.log(e)
    }
 }

await resetJobs();
await resetStaff();
await resetJoinTable();

    
})();





