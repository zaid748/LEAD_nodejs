require('dotenv').config();

const app = require('./server'); 
require('./database');
const {createRoles} = require('./libs/initialSetup');


createRoles();
// server is listenning
app.listen(app.get('port'), ()=>{
    console.log('server on port', app.get('port'));
});