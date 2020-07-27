const jwt = require('jsonwebtoken');
const {SECRET_KEY} = require('../config');

function createToken(username, is_admin, comp_id) {

    const payload = { username, is_admin, comp_id }
  
    const token = jwt.sign(payload, SECRET_KEY) 
    return (token)
}

module.exports = {createToken};