const express = require('express');
const router = new express.Router();
const Job = require('../models/jobsModel')
const {validateCreateJobJson} = require('../middleware/jsonValidation');
const { checkToken } = require('../middleware/auth');

/* Route to get all jobs by company id */

router.get('/', checkToken, async (req, res, next) => {
    try{
        const jobs = await Job.findAll(req.query.comp_id);
        return res.json({jobs});
    }
    catch(e) {
        return next(e);
    }
   
})

/* Route to create a job with json from request body */

router.post('/', checkToken, validateCreateJobJson, async (req, res, next) => {
    try {
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

router.post('/:id/add_staff', async (req, res, next) => {
    try {
        const staff = await Job.addStaff(req.params.id, req.body.user_id);
        return res.json({staff})
    }
    catch(e){
        return next(e);
    }
})

router.post('/:id/remove_staff', async (req, res, next) => {
    try {
        const staff = await Job.removeStaff(req.params.id, req.body.user_id);
        return res.json({staff})
    }
    catch(e){
        return next(e);
    }
})



module.exports = router;


