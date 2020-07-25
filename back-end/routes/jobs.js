const express = require('express');
const router = new express.Router();
const Job = require('../models/jobsModel')
const {validateCreateJobJson} = require('../middleware/jsonValidation');
const ExpressError = require('../helpers/expressError.js');

/* Route to get all jobs by company id */

router.get('/', async (req, res, next) => {
    try{
        const jobs = await Job.findAll(req.query.comp_id);
        return res.json({jobs});
    }
    catch(e) {
        return next(e);
    }
   
})

/* Route to create a job with json from request body */

router.post('/', validateCreateJobJson, async (req, res, next) => {
    try {
        console.log(req.body)
        const job = Job.create(req.body);
        await job.save();
        return res.status(201).json({job})
    }
    catch(e){
        return next(e);
    }
})

/* Route to get a job by id sent in request parameters */

router.get('/:id', async (req, res, next) => {
    console.log(req.params)
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

/*Route to delete a job with id */

router.delete('/:id', async (req, res, next) => {
    try {
        await Job.delete(req.params.id);
        return res.json(`Job with id ${req.params.id} deleted`)
    }
    catch(e){
        return next(e);
    }
})

/*Route add a staff to a job with staff id in body and job id from request, params */

router.post('/add_staff/:id', async (req, res, next) => {
    try {
        await Job.addStaff(req.params.id, req.body.staff_id);
        return res.json(`Staff with id ${req.body.staff_id} add to job with id ${req.params.id}`)
    }
    catch(e){
        return next(e);
    }
})



module.exports = router;


