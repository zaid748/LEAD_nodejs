const {Schema, model} = require('mongoose');

const CasaInventario = new Schema({
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
        type: String,
    }
});

module.exports = model('CasaInventario', CasaInventario);