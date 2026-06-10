const mongoose = require("mongoose");

let cachedConnection = null;

async function connectDB() {
  const MONGODB_URI = process.env.MONGODB_URI;

  if (!MONGODB_URI) {
    throw new Error("Critical: MONGODB_URI is not defined. Set this in Vercel Project Settings > Environment Variables.");
  }

  if (cachedConnection) {
    return cachedConnection;
  }

  try {
    // Options recommended for Mongoose 6+ compatibility
    const opts = {
      bufferCommands: false,
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000, // Fail fast if the DB is unreachable
      socketTimeoutMS: 45000,
    };

    cachedConnection = await mongoose.connect(MONGODB_URI, opts);
    return cachedConnection;
  } catch (error) {
    console.error("MongoDB Connection Error:", error);
    throw error;
  }
}

module.exports = connectDB;
