const mongoose = require('mongoose');
const mongoURI = 'mongodb://localhost:27017/mynotebook'; // Your MongoDB URI

// Async function to connect to MongoDB
async function connectToMongo() {
  try {
    await mongoose.connect(mongoURI); // No need for deprecated options
    console.log('Connected to MongoDB successfully');
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
    process.exit(1); // Exit if the connection fails
  }
}

module.exports = connectToMongo;
