const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const { Schema, model } = mongoose;

const usuario = new Schema({
    prim_nom: { type: String, required: true},
    segun_nom: { type: String, required: false},
    apell_pa: { type: String, required: true},
    apell_ma: { type: String, required: true},
    fecha_na: { type: String, required: true},
    pust: { type: String, required: true},
    calle: { type: String, required: true},
    num_in: { type: String, required: false},
    nun_ex: { type: String, required: true},
    codigo: { type: String, required: true},
    telefono: {type:String, required: true},
    email: { type: String, required: true, unique: true},
    password: { type: String, required: true},
    role: { type: String, default: 'user' },
    foto_perfil: { type: String, default: '/img/user_icon.svg' }
}, {
    timestamps: true
});

usuario.statics.encryptPassword = async (password) =>{
    const salt = await bcrypt.genSalt(10);
    const hash = bcrypt.hash(password, salt);
    return hash
};

usuario.statics.matchPassword = async function (password, respassword){
    return await bcrypt.compare(password, respassword);
}

module.exports = model('user', usuario);