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

})

afterAll(async() => {
    await db.query("DELETE FROM users");
    await db.query("DELETE FROM companies");
    // close databse connection
    await db.end();
})

describe("/GET", () => {

    test("Can get a list of users with info", async() =>{
    
        let res = await request(app).get(`/users?comp_id=${comp_id}&token=${adminToken}`);
        expect(res.status).toEqual(200);
        expect(res.body.users.length).toEqual(1);
        expect(res.body.users[0].first_name).toEqual("Jim");
        
    })

    test("Can get details for a staff", async() =>{
    
        let res = await request(app).get(`/users/${user1.id}?&token=${adminToken}`);
        expect(res.status).toEqual(200);
        expect(res.body.user.current_wage).toEqual(160);
    })

    test("Returns unauthorized if trying to access staff data from a different company", async() =>{
        let result = await request(app).post('/auth/register').send({
            company_name: "hacker",
            username: "bad",
            password: "pwd",
            first_name: "none",
            last_name: "none",
            is_admin: true
        })
     
        badAdminToken = result.body.token

        let res = await request(app).get(`/users/${user1.id}?&token=${badAdminToken}`);
        expect(res.status).toEqual(400);
        expect(res.body.message).toEqual("Unauthorized");
    })
})

describe("/POST", () => {

    test("Can create a new staff", async() =>{
        let res = await request(app).post('/users').send({
            username: "Sarah",
            first_name: "Sarah",
            last_name: "test",
            current_wage: "100",
            years_at_company: "2",
            comp_id,
            is_admin: false,
            token: adminToken
        })
        expect(res.status).toEqual(201);
        expect(res.body.user.first_name).toEqual("Sarah");
    })

})


describe("/PATCH", () => {

    test("Can update a staff", async() =>{
        let res = await request(app).patch(`/users/${user1.id}`).send({
            current_wage: "200",
            token: adminToken
        })
        expect(res.status).toEqual(200);
        expect(res.body.user.current_wage).toEqual("200");
    })
    
})

describe("/DELETE", () => {

    test("Can delete a staff", async() =>{
        let res = await request(app).delete(`/users/${user1.id}`).send({
            token: adminToken
        })
        expect(res.status).toEqual(200);
        expect(res.body).toEqual(`User with id ${user1.id} deleted`);
        
    })
    
})


    



