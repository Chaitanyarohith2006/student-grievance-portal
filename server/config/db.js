const mongoose = require('mongoose');

let cached = global._mongooseConn;

const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) return;
  if (!cached) {
    cached = global._mongooseConn = mongoose.connect(process.env.MONGODB_URI);
  }
  try {
    const conn = await cached;
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    cached = global._mongooseConn = null;
    console.error(`MongoDB Connection Error: ${error.message}`);
  }
};

module.exports = connectDB;
