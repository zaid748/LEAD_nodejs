const {Schema, model} = require('mongoose');

const EmpleadoSchema = new Schema({
    prim_nom: { type: String, required: true},
    segun_nom: { type: String, required: false},
    apell_pa: { type: String, required: true},
    apell_ma: { type: String, required: true},
    pust: { type: String, required: true},
    fecha_na: { type: String, required: false},
    calle: { type: String, required: false},
    num_in: { type: String, required: false},
    nun_ex: { type: String, required: false},
    codigo: { type: String, required: false},
    telefono: {type:String, required: true},
    email: {
        type: String,
        required: false,
        trim: true
    },
    salario: { type: String, required: true},
    fecha_ing: { type: String, required: true},
    estado: { type: String, required: true},
    foto_perfil: { type: String, default: '/img/user_icon.svg' },
    userId: { type: Schema.Types.ObjectId, ref: 'Users', default: null }
});

module.exports = model('Empleados', EmpleadoSchema);