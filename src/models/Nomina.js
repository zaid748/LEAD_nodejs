const { Schema, model} = require('mongoose');
const date = new Date();
const NominaScheme = new Schema({
    empleadoId: { type: String, required:true},
    empleado: { type: String, required:true},
    url: { type: String},
    conceptoDePago: { type: String, required:true},
    salario: { type: String, required:true},
    fecha: { type: String }
});

module.exports = model('Nomina', NominaScheme);