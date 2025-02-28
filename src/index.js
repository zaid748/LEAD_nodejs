require('dotenv').config();

const app = require('./server'); 
require('./database');
const {createRoles} = require('./libs/initialSetup');
const fs = require('fs');
const path = require('path');

// Asegurarse de que el directorio para uploads exista
const uploadDir = path.join(__dirname, 'public/uploads/profile_photos');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

createRoles();
// server is listenning
app.listen(app.get('port'), ()=>{
    console.log('server on port', app.get('port'));
});
