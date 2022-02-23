const Role = require('../models/Role');
const CreateRoles = {}; 
CreateRoles.createRoles = async ()=>{
    const count = await Role.estimatedDocumentCount();
    if(count > 0) return;

    const values = await Promise.all([
        new Role({name: 'user'}).save(),
        new Role({name: 'supervisors'}).save(),
        new Role({name: 'moderator'}).save(),
        new Role({name: 'admin'}).save(),
        new Role({name: 'administrator'}).save()
    ]);
}

module.exports = CreateRoles;