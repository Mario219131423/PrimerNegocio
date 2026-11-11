const mongoose = require('mongoose');
const connectDB = require('./config/db');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Base de datos conectada exitosamente 📦');
  } catch (error) {
    console.error('Error al conectar a la base de datos:', error.message);
    process.exit(1);
  }
};
module.exports = connectDB;
connectDB();