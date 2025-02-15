const mongoose = require('mongoose');
 
const {NOTES_APP_MONGODB_HOST} = process.env;


mongoose.set('strictQuery', true);

mongoose.connect(NOTES_APP_MONGODB_HOST, {
    useNewUrlParser: true, 
    useUnifiedTopology: true 
})
    .then(db => console.log('DB is connected'))
    .catch(err => console.log(err));