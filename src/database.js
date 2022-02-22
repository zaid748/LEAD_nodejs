const mongoose = require('mongoose');
 
const {NOTES_APP_MONGODB_HOST} = process.env;

const MONGODB_URI = `mongodb://${NOTES_APP_MONGODB_HOST}`

console.log(NOTES_APP_MONGODB_HOST);

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true, 
    useUnifiedTopology: true 
})
    .then(db => console.log('DB is connected'))
    .catch(err => console.log(err));