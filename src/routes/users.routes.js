const express = require('express');
const router = express.Router();
const { logout , signup, renderSignUpForm, signIn, renderSignInForm } = require('../controllers/users.controller');
    router.get('/users/registrar', renderSignUpForm);

    router.get('/users/signin', renderSignInForm);

    router.post('/users/signin', signIn, (req, res)=>{
        //console.log(req.body);
    });

    router.post('/users/registrar', signup);
    
    router.get('/users/logout', logout);

module.exports = router;