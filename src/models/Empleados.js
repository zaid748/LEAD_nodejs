const {Schema, model} = require('mongoose');

const EmpleadoSchema = new Schema({
    prim_nom: { type: String, required: true},
    segun_nom: { type: String, required: false},
    apell_pa: { type: String, required: true},
    apell_ma: { type: String, required: true},
    pust: { type: String, required: true},
    fecha_ing: { type: String, rewuired: true},
    calle: { type: String, required: true},
    num_in: { type: String, required: false},
    nun_ex: { type: String, required: true},
    codigo: { type: String, required: true},
    telefono: {type:String, required: true},
    email: { type: String, required: true, unique: true},
    salario: { type: String, required: true},
    fecha_ing: { type: String, rewuired: true},
    estado: { type: String, required: true}
});

module.exports = model('Empleados', EmpleadoSchema);