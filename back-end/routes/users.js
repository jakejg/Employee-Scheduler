const express = require('express');
const router = new express.Router();
const User = require('../models/usersModel');
const Job = require('../models/jobsModel');
const {validateCreateUserJson} = require('../middleware/jsonValidation');
const { checkAdminStatus } = require('../middleware/auth.js');
const verify = require('../helpers/verify');
const moment = require('moment');

/* Route to get overview of all users for a company that aren't admin*/

router.get('/', checkAdminStatus, async (req, res, next) => {
    try{
        const users = await User.findAll(req.query.comp_id);
        return res.json({users});
    }
    catch(e) {
        return next(e);
    }
   
})

/* Route to create a user with json from request body */

router.post('/', checkAdminStatus, validateCreateUserJson, async (req, res, next) => {
    try {
        const user = await User.create(req.body);
        await user.save();
        return res.status(201).json({user})
    }
    catch(e){
        return next(e);
    }
})

/* Route to get a user with id sent as request parameters */

router.get('/:id', async (req, res, next) => {
    try{
        const user = await User.findOne(req.params.id);
        verify(user.comp_id, req.user.comp_id);
        return res.json({user});
    }
    catch(e) {
        return next(e);
    }
   
})

/*Route to update a user with json from request body and id from request, params */

router.patch('/:id', checkAdminStatus, async (req, res, next) => {
    try {
        const user = await User.update(req.params.id, req.body);
        await user.save();
        return res.json({user})
    }
    catch(e){
        return next(e);
    }
})

router.delete('/:id', checkAdminStatus, async (req, res, next) => {
    try {
   
        const jobs = await User.findJobsForUser(req.params.id)
        await User.delete(req.params.id);

        // update all job status user is associated with
        for (job of jobs){
            if (moment(job.end_date) > moment()){
              
                const updatedJob = await Job.update(job.id);
                updatedJob.save();
            }
        }
       
         
        return res.json(`User with id ${req.params.id} deleted`)
    }
    catch(e){
        return next(e);
    }
})


module.exports = router;


