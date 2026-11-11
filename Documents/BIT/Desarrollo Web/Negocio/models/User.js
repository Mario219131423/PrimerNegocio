const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  correo: { type: String, required: true, unique: true },
  contrasena: { type: String, required: true },
  fidelidadPuntos: { type: Number, default: 0 },
  direccionEnvio: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);