const ExpressError = require('./expressError');

// raise an unauthorized error if both parameters aren't equal
function verify(a, b){

    if (a !== b) throw new ExpressError("Unauthorized", 400);
}

module.exports = verify