const mongoose = require('mongoose');
const DB_URI = 'mongodb://localhost:27017/test';

const connectionDB = async () => {
    try {
        mongoose.connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
            .then(() => console.log('Connected to DB:', DB_URI))
            .catch((err) => console.log('Failed to connect to DB:', err));
    } catch (error) {
        console.error(err.message);
        process.exit(1);
    }
};

module.exports = connectionDB;