const mongoose = require('mongoose');
 
const {NOTES_APP_MONGODB_HOST} = process.env;

const MONGODB_URI = `${NOTES_APP_MONGODB_HOST}`;

mongoose.set('strictQuery', true);

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true, 
    useUnifiedTopology: true 
})
    .then(db => console.log('DB is connected',  db))
    .catch(err => console.log(err));