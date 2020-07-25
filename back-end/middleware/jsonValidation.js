const jsonschema = require('jsonschema');
const createJobSchema = require('../schemas/createJobSchema.json');
const createUserSchema = require('../schemas/createUserSchema.json');
const ExpressError = require('../helpers/expressError');

function validate(body, next, schema) {
    const result = jsonschema.validate(body, schema)
        if (!result.valid) {
          let listOfErros = result.errors.map(error => error.stack)
          let error = new ExpressError(listOfErros, 400)
          return next(error)
        }
        else {
            return next()
        }
}

function validateCreateJobJson(req, res, next){
    
    validate(req.body, next, createJobSchema);
}

function validateCreateUserJson(req, res, next){
    
    validate(req.body, next, createUserSchema);
}

module.exports = {
    validateCreateJobJson,
    validateCreateUserJson
}