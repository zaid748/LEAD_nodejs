const helpers = {};
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const {SECRET} = process.env;

helpers.isAuthenticated = async(req, res, next) =>{
    const cookies = req.cookies;
    const authorization  = cookies.Authorization;
    if(authorization){    
        const decoded = jwt.verify(authorization, SECRET);
        const  { _id } = decoded;
        const usuario = await User.findById({ _id});
        if (usuario){
            req.token = authorization;
            req.user = usuario.id;
            return next();
        }else{
            res.render('users/signin');
        }
    }else{
        res.render('users/signin');
        console.log('error no existe token');
    }
}

module.exports = helpers;