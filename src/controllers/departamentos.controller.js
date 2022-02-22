const departamentoCtrl = {};

const Departamentos = require('../models/Departamentos');

departamentoCtrl.mostrarDepartamentos = async(req, res, next) =>{
    const departments = await Departamentos.find();
    return next();
}

module.exports = departamentoCtrl;