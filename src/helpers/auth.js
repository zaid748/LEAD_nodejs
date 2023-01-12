const helpers = {};
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const {SECRET} = process.env;

helpers.isAuthenticated = async(req, res, next) =>{
    const { token } = req.params;
    const cookies = req.cookies;
    const authorization  = cookies.Authorization;
    if(authorization){
        const decoded = jwt.verify(authorization, SECRET);
        const  { _id } = decoded;
        const usuario = await User.findById({ _id});
        if (usuario){
            req.token = authorization;
            req.user = usuario.id;
            req.role = usuario.role;
            return next();
        }else{
            res.render('users/signin');
        }
    }else if(token){
        const decoded = jwt.verify(token, SECRET);
        const  { _id } = decoded;
        const usuario = await User.findById({ _id});
        if (usuario){
            req.token = token;
            req.user = usuario.id;
            req.role = usuario.role;
            return next();
        }else{
            res.render('users/signin');
        }
    }else{
        return next();
        console.log('error no existe token');
    }
}

helpers.isAustheAdministrator = async(req, res, next)=>{
    const role = req.role;
    const user = req.token;
    if(role == "administrator" || role == "admin"){
        return next();
    }else{
        res.render('home', {role, user});
    }
}

module.exports = helpers;