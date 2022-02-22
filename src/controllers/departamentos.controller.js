const departamentoCtrl = {};

const Departamentos = require('../models/Departamentos');

departamentoCtrl.mostrarDepartamentos = async(req, res, next) =>{
    const departments = await Departamentos.find();
    const hola = 'hola depastamentos'
    console.log(departments, hola);
    return next();
}

module.exports = departamentoCtrl;