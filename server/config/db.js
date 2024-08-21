const mongoose = require('mongoose');
require('dotenv').config();  // Ensure environment variables are loaded

const connectDB = async () => {
    try {
        // Log to check if the MongoDB URI is correctly loaded
        console.log('MongoDB URI:', process.env.MONGO_URI);

        // Connect to MongoDB
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB Connected');
    } catch (err) {
        console.error('MongoDB connection error:', err.message);
        process.exit(1); // Exit process with failure
    }
};

module.exports = connectDB;
