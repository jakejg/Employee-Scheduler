const ExpressError = require('../helpers/expressError');
const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../config');

// checks for and verifies a JSON web token and adds the payload to the req object

function authorize(req, res, next) {
    try{
        const token = req.body.token || req.query.token;
        const payload = jwt.verify(token, SECRET_KEY);
        req.user = payload;
        return next();
    }
    catch(e){
       
        return next()
    }
}

// checks that a token was sent

function checkToken(req, res, next) {
    try{
        if (!req.user) throw new ExpressError("Unauthorized", 400); 
        
        return next();
    }
    catch(e){
        return next(e);
    }
}


// verifies the user requesting data is an admin
function checkAdminStatus(req, res, next) {
    try{
        if (!req.user) throw new ExpressError("Unauthorized", 400); 
        
        if (!req.user.is_admin) throw new ExpressError("Need Admin Permissions", 400); 
        
        return next();
    }
    catch(e){
        next(e);
    }

}
module.exports = {
    authorize,
    checkToken,
    checkAdminStatus
}