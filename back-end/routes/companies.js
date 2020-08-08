const express = require('express');
const router = new express.Router();
const Company = require('../models/companyModel')
const ExpressError = require('../helpers/expressError.js');

/* Route to get all companies */

router.get('/', async (req, res, next) => {
    try{
        const jobs = await Company.findAll();
        return res.json({jobs});
    }
    catch(e) {
        return next(e);
    }
   
})

/* Route to create a company with json from request body */

router.post('/', async (req, res, next) => {
    try {
        const company = Company.create(req.body);
        await company.save();
        return res.status(201).json({company})
    }
    catch(e){
        return next(e);
    }
})

/* Route to get a company with id send it request parameters */

router.get('/:id', async (req, res, next) => {
    try{
        const company = await Company.findOne(req.params.id);
        return res.json({company});
    }
    catch(e) {
        return next(e);
    }
   
})

/*Route to update a company with json from request body and id from request, params */

router.patch('/:id', async (req, res, next) => {
    try {
        const company = await Company.update(req.params.id, req.body);
        await company.save();
        return res.json({company})
    }
    catch(e){
        return next(e);
    }
})

router.delete('/:id', async (req, res, next) => {
    try {
        await Company.delete(req.params.id);
        return res.json(`Company with id ${req.params.id} deleted`)
    }
    catch(e){
        return next(e);
    }
})


module.exports = router;
