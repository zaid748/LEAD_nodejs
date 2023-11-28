const indexCtrl = {};
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const {SECRET} = process.env;

indexCtrl.renderIndex = async(req, res) =>{
    const cookies = req.cookies;
    const title = "Lead Inmobiliaria";
    const authorization  = cookies.Authorization;
    if(authorization){    
        const decoded = jwt.verify(authorization, SECRET);
        const  { _id } = decoded;
        const usuario = await User.findById({ _id});
        if (usuario){
            res.render('home',{ 
                user: usuario,
                nombre: usuario.prim_nom, 
                apellido_pa: usuario.apell_pa, 
                apellido_ma: usuario.apell_ma,
                role: usuario.role,
                title
            });
        }else{
            res.render('users/signin', {title});
        }
    }else{
        res.render('users/signin', {title});
        console.log('error no existe token');
    }
};
indexCtrl.renderRegistra = (req, res) =>{
    const title = "Lead Inmobiliaria";
    res.render('users/signup', {title});
};

module.exports = indexCtrl;