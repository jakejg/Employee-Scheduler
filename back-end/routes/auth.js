const express = require('express');
const router = new express.Router();
const ExpressError = require('../helpers/expressError.js');
const {createToken} = require('../helpers/createToken');
const User = require('../models/usersModel');

/* Route to register a new user */

router.post('/register', async (req, res, next) => {
    try{
        const user = await User.create(req.body);
        await user.save();
        const token = createToken(user.username, user.is_admin, user.comp_id);
        return res.json({token});
    }
    catch(e) {
        return next(e);
    }
   
})

/* Route to login a user */

router.post('/login', async (req, res, next) => {
    try{
        const { username, password } = req.body;
        const isAuthorized = await User.authenticate(username, password);

        if (!isAuthorized) throw new ExpressError("Password and username do not match", 400);

        const user = await User.findByUsername(username)
        const token = createToken(user.username, user.is_admin, user.comp_id)

        return res.json({token});
    }
    catch(e){
        next(e);
    }      
   
})



module.exports = router;
