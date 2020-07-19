const express = require('express');
const router = new express.Router();
const User = require('../models/usersModel')
const ExpressError = require('../helpers/expressError.js');

/* Route to get all users */

router.get('/', async (req, res, next) => {
    try{
        const users = await User.findAll();
        return res.json({users});
    }
    catch(e) {
        return next(e);
    }
   
})

/* Route to create a user with json from request body */

router.post('/', async (req, res, next) => {
    try {
        const user = User.create(req.body);
        await user.save();
        return res.status(201).json({user})
    }
    catch(e){
        return next(e);
    }
})

/* Route to get a user with id send it request parameters */

router.get('/:id', async (req, res, next) => {
    try{
        const user = await User.findOne(req.params.id);
        return res.json({user});
    }
    catch(e) {
        return next(e);
    }
   
})

/*Route to update a user with json from request body and id from request, params */

router.patch('/:id', async (req, res, next) => {
    try {
        const user = await User.update(req.params.id, req.body);
        await user.save();
        return res.json({user})
    }
    catch(e){
        return next(e);
    }
})

router.delete('/:id', async (req, res, next) => {
    try {
        await User.delete(req.params.id);
        return res.json(`User with id ${req.params.id} deleted`)
    }
    catch(e){
        return next(e);
    }
})


module.exports = router;

