// use test database
process.env.NODE_ENV === 'test';

//connect to database
const db = require('../../db');

const request = require('supertest');
const app = require('../../app');
const User = require('../../models/usersModel');
const {decode} = require('jsonwebtoken');

const bcrypt = require('bcrypt');
const { BCRYPT_WORK_FACTOR } = require('../../config');

let adminToken;
let comp_id;
let user1;
let job1;

beforeAll(async() => {
    // set up new admin user and company to use with tests
    let res = await request(app).post('/auth/register').send({
        company_name: "Test Company",
        username: "tst",
        password: "pwd",
        first_name: "new",
        last_name: "test",
        is_admin: true
    })
 
    adminToken = res.body.token

    // hash password
    const pwd = await bcrypt.hash("test123", BCRYPT_WORK_FACTOR);
    // get company id
    comp_id = decode(adminToken).comp_id

    const results1 = await db.query(`INSERT INTO users
            (username, first_name, last_name, comp_id, is_admin, current_wage, years_at_company)
            VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING *`,
            ["Jim", "Jim", "Smith", comp_id, false, 160, 5]
            );

    user1 = results1.rows[0];

    const results2 = await db.query(`INSERT INTO jobs 
            (title, start_date, end_date, staff_needed, notes, comp_id) 
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING *`,
            ['10 Day Test Job', '2020-07-04', '2020-07-14', 2, 'testing', comp_id]
            );

    job1 = results2.rows[0]

})

afterAll(async() => {
    await db.query("DELETE FROM users_jobs");
    await db.query("DELETE FROM users");
    await db.query("DELETE FROM jobs");
    await db.query("DELETE FROM companies");
    // close databse connection
    await db.end();
})

describe("/GET", () => {

    test("Can get a list of jobs with info", async() =>{
    
        let res = await request(app).get(`/jobs?comp_id=${comp_id}&token=${adminToken}`);
        expect(res.status).toEqual(200);
        expect(res.body.jobs.length).toEqual(1);
        expect(res.body.jobs[0].title).toEqual('10 Day Test Job');
        
    })

    test("Can get details for a job", async() =>{
    
        let res = await request(app).get(`/jobs/${job1.id}?&token=${adminToken}`);
        expect(res.status).toEqual(200);
        expect(res.body.job.notes).toEqual("testing");
    })

    test("Returns unauthorized if trying to access job data from a different company", async() =>{
        let result = await request(app).post('/auth/register').send({
            company_name: "hacker",
            username: "bad",
            password: "pwd",
            first_name: "none",
            last_name: "none",
            is_admin: true
        })
     
        badAdminToken = result.body.token

        let res = await request(app).get(`/jobs/${job1.id}?&token=${badAdminToken}`);
        expect(res.status).toEqual(400);
        expect(res.body.message).toEqual("Unauthorized");
    })
})

describe("/POST", () => {

    test("Can create a new job", async() =>{
        let res = await request(app).post('/jobs').send({
            "title": "New Job",
            "start_date": "2020-07-25T13:45:06.762Z",
            "end_date": "2020-08-25T13:45:06.762Z",
            "staff_needed": "4",
            "notes": "This job needs two experienced staff",
            "comp_id": comp_id,
            token: adminToken
        })
        expect(res.status).toEqual(201);
        expect(res.body.job.staff_needed).toEqual("4");
    })

    test("Can add a new staff to a job", async() =>{
        let res = await request(app).post(`/jobs/${job1.id}/add_staff`).send({
            user_id: user1.id,
            token: adminToken
        })
        expect(res.status).toEqual(200);
        expect(res.body.staff.length).toEqual(1);
        expect(res.body.staff[0].id).toEqual(user1.id);
    })

    test("Can remove a staff from a job", async() =>{
        let res = await request(app).post(`/jobs/${job1.id}/remove_staff`).send({
            user_id: user1.id,
            token: adminToken
        })
        expect(res.status).toEqual(200);
        expect(res.body.staff.length).toEqual(0);
    })
})


describe("/PATCH", () => {

    test("Can update a staff", async() =>{
        let res = await request(app).patch(`/jobs/${job1.id}`).send({
            start_date: '2020-07-05',
            end_date: '2020-07-15',
            token: adminToken
        })
        expect(res.status).toEqual(200);
        expect(res.body.job.end_date).toEqual("2020-07-15");
    })
    
})

describe("/DELETE", () => {

    test("Can delete a job", async() =>{
        let res = await request(app).delete(`/jobs/${job1.id}`).send({
            token: adminToken
        })
        expect(res.status).toEqual(200);
        expect(res.body).toEqual(`Job with id ${job1.id} deleted`);
        
    })
    
})


    



