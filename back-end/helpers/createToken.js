const jwt = require('jsonwebtoken');
const {SECRET_KEY} = require('../config');

function createToken(username, adminStatus) {

    const payload = {
        username: username,
        is_admin: adminStatus
    }
  
    const token = jwt.sign(payload, SECRET_KEY) 
    return (token)
}

module.exports = {createToken};