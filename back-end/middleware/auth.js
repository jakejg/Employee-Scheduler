const ExpressError = require('../helpers/expressError');
const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../config');

// checks for and verifies a JSON web token and adds the payload to the req object
function authorize(req, res, next) {
    try{
        
        const payload = jwt.verify(req.body._token, SECRET_KEY);
        req.user = payload;
        return next();
    }
    catch(e){
        return next();
    }
}

// verifies the username sent in the url is the sames as the username sent in the token

// function checkUsername(req, res, next) {
//     try{
//         if (!req.user) throw new ExpressError("Unauthorized", 400); 
        
//         if (req.params.username !== req.user.username) throw new ExpressError("Unauthorized", 400); 
        
//         return next();
//     }
//     catch(e){
//         return next(e);
//     }
// }


// function checkAdminStatus(req, res, next) {
//     try{
//         if (!req.user) throw new ExpressError("Unauthorized", 400); 
        
//         if (!req.user.is_admin) throw new ExpressError("Need Admin Permissions", 400); 
        
//         return next();
//     }
//     catch(e){
//         next(e);
//     }
// }
module.exports = {
    authorize
    // checkUsername,
    // checkAdminStatus
}