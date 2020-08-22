const db = require('./db');
const moment = require('moment');

// reset demo job data
async function resetJobs() {
    try{
        await db.query(`DELETE FROM jobs
        WHERE comp_id=$1`,
        [1])

        await db.query(`INSERT INTO jobs
        (title, start_date, end_date, staff_needed, notes, comp_id, calendar_event_id)
        VALUES  
        ($1, $2, $3, $4, $5, $6, $7),
        ($8, $9, $10, $11, $12, $13, $14),
        ($15, $16, $17, $18, $19, $20, $21)`,
        [
        '15 day Mountain', moment().add(5, 'day').format(), moment().add(20, 'day').format(), 2, 'Need to get new backpacks', 1, 'AAMkAGZlYTI0YjJjLTg2ZjEtNDliNC1hMzEyLTRjZWQ1MTUxZDY0YgBGAAAAAADeU7Uxc9NWSb0_KQxp3SxZBwDOkpB1ICt6TpndDjvJOZEqAAAB5y1mAADOkpB1ICt6TpndDjvJOZEqAAAB54uaAAA=',
        '20 day River', moment().add(-2, 'day').format(), moment().add(18, 'day').format(), 3, 'Desolation Canyon', 1, 'AAMkAGZlYTI0YjJjLTg2ZjEtNDliNC1hMzEyLTRjZWQ1MTUxZDY0YgBGAAAAAADeU7Uxc9NWSb0_KQxp3SxZBwDOkpB1ICt6TpndDjvJOZEqAAAB5y1mAADOkpB1ICt6TpndDjvJOZEqAAAB54uZAAA=',
        '30 day Canyon', moment().add(1, 'day').format(), moment().add(31, 'day').format(), 3, 'Do not use new backpacks', 1, 'AAMkAGZlYTI0YjJjLTg2ZjEtNDliNC1hMzEyLTRjZWQ1MTUxZDY0YgBGAAAAAADeU7Uxc9NWSb0_KQxp3SxZBwDOkpB1ICt6TpndDjvJOZEqAAAB5y1mAADOkpB1ICt6TpndDjvJOZEqAAAB54uYAAA='
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

resetJobs();
resetStaff();








