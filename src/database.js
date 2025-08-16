const mongoose = require('mongoose');

// Intentar usar MONGODB_URI primero, si no está disponible, construir la URI
let mongoUri = process.env.MONGODB_URI;

if (!mongoUri) {
    // Construir la URI usando variables individuales
    const host = process.env.MONGODB_HOST || 'localhost';
    const port = process.env.MONGODB_PORT || '27017';
    const database = process.env.MONGODB_DATABASE || 'lead-db-prueba';
    const username = process.env.MONGODB_USERNAME || 'admin_lead';
    const password = process.env.MONGODB_PASSWORD || 'LeadPass2024';
    const authSource = process.env.MONGODB_AUTH_SOURCE || 'admin';
    
    mongoUri = `mongodb://${username}:${password}@${host}:${port}/${database}?authSource=${authSource}`;
}

console.log('Attempting to connect to MongoDB...');
console.log('MongoDB URI:', mongoUri.replace(/\/\/[^:]+:[^@]+@/, '//***:***@')); // Ocultar credenciales en logs

mongoose.set('strictQuery', true);

mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 10000, // Aumentado para dar más tiempo
    socketTimeoutMS: 45000,
    maxPoolSize: 10,
    minPoolSize: 5,
    connectTimeoutMS: 15000, // Aumentado para dar más tiempo
    retryWrites: true,
    w: 'majority'
})
.then(db => {
    console.log('✅ Database is connected successfully');
    console.log('📊 Database name:', db.connection.name);
    console.log('🔌 Connection state:', db.connection.readyState);
    
    // Solo habilitar debug en desarrollo
    if (process.env.NODE_ENV === 'development') {
        mongoose.set('debug', true);
        mongoose.set('debug', (collectionName, method, query, doc) => {
            console.log(`🐛 ${collectionName}.${method}`, JSON.stringify(query), doc);
        });
    }
})
.catch(err => {
    console.error('❌ Error connecting to database:', err.message);
    console.error('🔍 Error details:', err);
    
    // En desarrollo, no salir del proceso para permitir reintentos
    if (process.env.NODE_ENV === 'production') {
        process.exit(1);
    }
});

// Manejar eventos de conexión
mongoose.connection.on('error', (err) => {
    console.error('❌ MongoDB connection error:', err);
});

mongoose.connection.on('disconnected', () => {
    console.log('🔌 MongoDB disconnected');
});

mongoose.connection.on('reconnected', () => {
    console.log('🔄 MongoDB reconnected');
});

// Manejar cierre graceful
process.on('SIGINT', async () => {
    try {
        await mongoose.connection.close();
        console.log('✅ MongoDB connection closed through app termination');
        process.exit(0);
    } catch (err) {
        console.error('❌ Error closing MongoDB connection:', err);
        process.exit(1);
    }
});

module.exports = mongoose;