const mongoose = require('mongoose');

const { MONGODB_URI } = process.env;

if (!MONGODB_URI) {
    console.error('Error: MONGODB_URI is not defined in environment variables');
    process.exit(1);
}

console.log('Attempting to connect to MongoDB...');

mongoose.set('strictQuery', true);

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 30000,
    socketTimeoutMS: 45000,
    maxPoolSize: 10,
    minPoolSize: 5,
    connectTimeoutMS: 10000,
})
.then(db => {
    console.log('Database is connected');
    mongoose.set('debug', true);
    mongoose.set('debug', (collectionName, method, query, doc) => {
        console.log(`${collectionName}.${method}`, JSON.stringify(query), doc);
    });
})
.catch(err => {
    console.error('Error connecting to database:', err);
    console.error('Error details:', err.message);
    process.exit(1);
});

module.exports = mongoose;