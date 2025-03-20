const mongoose = require('mongoose');

// Usa la variable de entorno MONGODB_URI
const { MONGODB_URI } = process.env;

console.log('Connecting to MongoDB:', MONGODB_URI);

mongoose.set('strictQuery', true);

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 30000, // Aumenta el timeout a 30 segundos
    socketTimeoutMS: 45000,
})
.then(db => console.log('Database is connected'))
.catch(err => console.error('Error connecting to database:', err));