const express = require('express');
const router = new express.Router();
const Job = require('../models/jobsModel')
const {validateCreateJobJson} = require('../middleware/jsonValidation');
const { checkAdminStatus } = require('../middleware/auth');
const verify = require('../helpers/verify');

/* Route to get all jobs by company id */

router.get('/', checkAdminStatus, async (req, res, next) => {
    try{
        const jobs = await Job.findAll(req.query.comp_id);
        return res.json({jobs});
    }
    catch(e) {
        return next(e);
    }
   
})

/* Route to create a job with json from request body */

router.post('/', checkAdminStatus, validateCreateJobJson, async (req, res, next) => {
    try {
        const job = await Job.create(req.body);
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
        verify(job.comp_id, req.user.comp_id);
        return res.json({job});
    }
    catch(e) {
        return next(e);
    }
   
})

/*Route to update a job with json from request body and id from request, params */

router.patch('/:id', checkAdminStatus,async (req, res, next) => {
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

router.delete('/:id', checkAdminStatus, async (req, res, next) => {
    try {
        await Job.delete(req.params.id);
        return res.json(`Job with id ${req.params.id} deleted`)
    }
    catch(e){
        return next(e);
    }
})

/*Route add a staff to a job with staff id in body and job id from request, params */

router.post('/:id/add_staff', checkAdminStatus, async (req, res, next) => {
    try {
        const staffList = await Job.addStaff(req.params.id, req.body.user_id);
        
        // update status
        const job = await Job.update(req.params.id);
        await job.save();

        // update calendar API
        Job.sendOrCancelCalendarInvite(req.params.id, staffList);

        return res.json({staffList, status: job.status});

    
    }
    catch(e){
        return next(e);
    }
})

router.post('/:id/remove_staff', checkAdminStatus, async (req, res, next) => {
    try {
        const staffList = await Job.removeStaff(req.params.id, req.body.user_id);

        // update status
        const job = await Job.update(req.params.id);
        await job.save();

        // update calendar API
        Job.sendOrCancelCalendarInvite(req.params.id, staffList);
        
        return res.json({staffList, status: job.status});
    }
    catch(e){
        return next(e);
    }
})



module.exports = router;


