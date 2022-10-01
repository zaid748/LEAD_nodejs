const {Schema, model} = require('mongoose');

const ImgInventario = new Schema({
    Id_Inventario:{
        type: String,
    },
    url:{
        type: String,
    }
});

module.exports = model('CasaInventario', ImgInventario);