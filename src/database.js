const mongoose = require('mongoose');

const { MONGODB_URI } = process.env;

if (!MONGODB_URI) {
    console.error('Error: MONGODB_URI is not defined in environment variables');
    process.exit(1);
}

console.log('Connecting to MongoDB:', MONGODB_URI);

mongoose.set('strictQuery', true);

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 30000, // Timeout de 30 segundos
    socketTimeoutMS: 45000,
})
.then(db => console.log('Database is connected'))
.catch(err => console.error('Error connecting to database:', err));

module.exports = mongoose;