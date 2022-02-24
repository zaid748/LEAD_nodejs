const indexCtrl = {};
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const {SECRET} = process.env;

indexCtrl.renderIndex = async(req, res) =>{
    const cookies = req.cookies;
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
                role: usuario.role
            });
        }else{
            res.render('users/signin');
        }
    }else{
        res.render('users/signin');
        console.log('error no existe token');
    }
};
indexCtrl.renderRegistra = (req, res) =>{
    res.render('users/signup');
};

module.exports = indexCtrl;