departamentoCtrl = {};

const Departamentos = require('../models/Departamentos');

departamentoCtrl.mostrarDepartamentos = async(req, res, next) =>{
    const departments = await Departamentos.find();
    console.log(departments, 'hola depastamentos');
    return next();
}