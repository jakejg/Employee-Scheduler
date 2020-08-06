// use test database
process.env.NODE_ENV === 'test';

//connect to database
const db = require('../../db');

const request = require('supertest');
const app = require('../../app');
const {decode} = require('jsonwebtoken');

const bcrypt = require('bcrypt');
const { BCRYPT_WORK_FACTOR } = require('../../config');

let comp1;
let user1;

// set up test company and user
beforeAll(async() => {
    const compRes = await db.query(`INSERT INTO companies
            (name)
            VALUES ($1)
            RETURNING *`,
            ["company"]
            );
    comp1 = compRes.rows[0];

    const pwd = await bcrypt.hash("test123", BCRYPT_WORK_FACTOR);

    const results1 = await db.query(`INSERT INTO users
            (username, password, first_name, last_name, comp_id, is_admin)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING *`,
            ["t", pwd , "test", "person", comp1.id, true]
            );

    user1 = results1.rows[0];
})

afterAll(async() => {
    await db.query("DELETE FROM users");
    await db.query("DELETE FROM companies");
    // close databse connection
    await db.end();
})

describe("Authentication Routes", () => {

    test("Can register a new account with user and company", async() =>{
        let res = await request(app).post('/auth/register').send({
            company_name: "Test Company",
            username: "tester",
            password: "pwd",
            first_name: "new",
            last_name: "test",
            is_admin: true
        })
        expect(res.status).toEqual(200);
        expect(decode(res.body.token).username).toEqual("tester");
        expect(decode(res.body.token).is_admin).toEqual(true);

        let results = await db.query(`SELECT id FROM companies WHERE name=$1`, ['Test Company']);
        let companyId = results.rows[0].id;

        expect(decode(res.body.token).comp_id).toEqual(companyId);
    })

    
    test("Sends error message if username is taken", async() =>{
        let res = await request(app).post('/auth/register').send({
            company_name: "Test Company",
            username: "t",
            password: "pwd",
            first_name: "new",
            last_name: "test",
            is_admin: true
        })
        expect(res.status).toEqual(400);
        expect(res.body.message).toEqual("Username already exists");
    })

    test("Can login a user with correct password", async() =>{
        console.log(user1.username)
        let res = await request(app).post('/auth/login').send({
            username: "t",
            password: "test123",
        })
        expect(res.status).toEqual(200);
        expect(decode(res.body.token).username).toEqual("t");
        expect(decode(res.body.token).is_admin).toEqual(true);

        let results = await db.query(`SELECT id FROM companies WHERE name=$1`, [comp1.name]);
        let companyId = results.rows[0].id;

        expect(decode(res.body.token).comp_id).toEqual(companyId);
    })

    test("Sends error message for incorrect password", async() =>{
        let res = await request(app).post('/auth/login').send({
            username: "t",
            password: "wrong",
        })
        expect(res.status).toEqual(400);
        expect(res.body.message).toEqual('Password and username do not match');
    })
})








