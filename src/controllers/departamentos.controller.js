departamentoCtrl = {};

const Departamentos = require('../models/Departamentos');

departamentoCtrl.mostrarDepartamentos = async(req, res) =>{
    const departments = await Departamentos.find();
    console.log(departments);
    res.render('users/signup');
}