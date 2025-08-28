const {Schema, model} = require('mongoose');

const CasaInventario = new Schema({
    Titulo:{
        type: String
    },
    Tipo_Credito:{
        type: String
    },
    Fraccionamiento: {
        type: String
    },
    Tipo:{
        type: String,
    },
    Direccion:{
        type: String,
    },
    Descripcion:{
        type: String,
    },
    numDeRecamaras:{
        type: String
    },
    Presio:{
        type: String,
    },
    MtrTerreno:{
        type: String,
    },
    MtsDeCostruccion: {
        type: String,
    },
    Entrega:{
        type: String
    },
    Avaluo:{
        type:  String,
    },
    Comision:{
        type: String,
    },
    url:{
        type: Array,
    },
    Nombre_contacto:{
        type: String,
    },
    Contacto:{
        type: String,
    },
    Estatus:{
        type: String
    },
    // Campos adicionales para marketing
    precioOferta: {
        type: String,
        default: null
    },
    descripcionMarketing: {
        type: String,
        default: null
    },
    imagenesMarketing: {
        type: Array,
        default: []
    }
});

module.exports = model('CasaInventario', CasaInventario);