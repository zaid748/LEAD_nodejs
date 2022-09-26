const {Schema, model} = require('mongoose');
const { stringAt } = require('pdfkit/js/data');

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
        type: String,
    },
    contacto:{
        type: String,
    }
});

module.exports = model('CasaInventario', CasaInventario);