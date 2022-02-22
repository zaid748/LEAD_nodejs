departamentoCtrl = {};

const Departamentos = require('../models/Departamentos');

departamentoCtrl.mostrarDepartamentos = async(req, res) =>{
    const departments = await Departamentos.find();
    console.log(departments, 'hola depastamentos');
    res.render('users/signup');
}