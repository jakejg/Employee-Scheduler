const express = require('express');
const router = new express.Router();
const ExpressError = require('../helpers/expressError.js');
const {createToken} = require('../helpers/createToken');
const User = require('../models/usersModel');
const Company = require('../models/companyModel.js');


/* Route to register a new user */

router.post('/register', async (req, res, next) => {
    try{
        if (await User.checkUsername(req.body.username)) throw new ExpressError("Username is taken", 400);
        if (await Company.checkCompanyName(req.body.company_name)) throw new ExpressError("A comany with that name already exists", 400);
        
        const user = await User.create(req.body);
        // if no company id is sent, create a new company and associate with user
        if (!req.body.comp_id){
           
            const company = await Company.create(req.body.company_name);
            await company.save();
            user.comp_id = company.id;
           
        }
        await user.save()
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

        const user = await User.findByUsername(username);

         // check if a calendar exists for a company
        Company.checkCalendar(user.comp_id)
       
        const token = createToken(user.username, user.is_admin, user.comp_id)

        return res.json({token});
    }
    catch(e){
        next(e);
    }      
   
})



module.exports = router;
