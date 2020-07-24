const express = require('express');
const router = new express.Router();
const ExpressError = require('../helpers/expressError.js');
const {createToken} = require('../helpers/createToken');
const User = require('../models/usersModel');

/* Route to register a new admin user */

router.post('/register', async (req, res, next) => {
    try{
        const user = await User.create(req.body);
        await user.save();
        const token = createToken(user.username, user.is_admin);
        return res.json({token});
    }
    catch(e) {
        return next(e);
    }
   
})

/* Route to login an admin user */

router.post('/login', async (req, res, next) => {
    try{
        const { username, password } = req.body;
        const isAuthorized = User.authenticate(username, password);

        if (!isAuthorized) return new ExpressError("Password and username do not match", 400);

        const token = createToken(username, true)
        return res.json({token});
        
    }
    catch(e){
        next(e);
    }      
   
})



module.exports = router;
