const express = require('express');
const router = new express.Router();
const Job = require('../models/jobsModel')
const ExpressError = require('../helpers/expressError.js');

/* Route to get all jobs */

router.get('/', async (req, res, next) => {
    try{
        const jobs = await Job.findAll();
        return res.json({jobs});
    }
    catch(e) {
        return next(e);
    }
   
})

/* Route to create a job with json from request body */

router.post('/', async (req, res, next) => {
    try {
        const job = Job.create(req.body);
        await job.save();
        return res.status(201).json({job})
    }
    catch(e){
        return next(e);
    }
})

/* Route to get a job with id send it request parameters */

router.get('/:id', async (req, res, next) => {
    try{
        const job = await Job.findOne(req.params.id);
        return res.json({job});
    }
    catch(e) {
        return next(e);
    }
   
})

/*Route to update a job with json from request body and id from request, params */

router.patch('/:id', async (req, res, next) => {
    try {
        const job = await Job.update(req.params.id, req.body);
        await job.save();
        return res.json({job})
    }
    catch(e){
        return next(e);
    }
})

router.delete('/:id', async (req, res, next) => {
    try {
        await Job.delete(req.params.id);
        return res.json(`Job with id ${req.params.id} deleted`)
    }
    catch(e){
        return next(e);
    }
})


module.exports = router;


