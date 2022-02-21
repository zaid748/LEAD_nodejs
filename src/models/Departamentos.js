const {Schema, model} = require('mongoose');

const DepartamentosSchema = new Schema({
    departments:{
        type: Array
    } 
});

module.exports = model('Departamentos', DepartamentosSchema);