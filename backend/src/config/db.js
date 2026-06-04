const mongoose = require('mongoose');

const connectDB = async () => {
  const conn = await mongoose.connect(process.env.MONGO_URI, {
    dbName: 'taskslist'
  });
  console.log(`MongoDB connected: ${conn.connection.host}, Database: ${conn.connection.name}`);
};

module.exports = connectDB;
