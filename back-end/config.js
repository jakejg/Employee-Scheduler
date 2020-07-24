/* Configuration file for setting up database and storing application variables */

require("dotenv").config();

const SECRET_KEY = process.env.KEY;
const BCRYPT_WORK_FACTOR = 12;

// set which database to use for testing
// use environmental variable DB_URL on heroku
let DB_URI;
if (process.env.NODE_ENV === 'test') DB_URI = 'postgresql:///scheduler_test';
else DB_URI = process.env.DB_URL || 'postgresql:///scheduler';


const PORT = process.env.PORT || 5000;

module.exports = {
    PORT,
    DB_URI,
    SECRET_KEY,
    BCRYPT_WORK_FACTOR
}