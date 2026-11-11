const User = require('../models/User');

const registerUser = async (req, res) => {
  try {
    const { nombre, correo, contrasena, fidelidadPuntos, direccionEnvio } = req.body;

    const existingUser = await User.findOne({ correo });
    if (existingUser) {
      return res.status(400).json({ error: 'El correo ya está registrado' });
    }

    const newUser = new User({
      nombre,
      correo,
      contrasena,
      fidelidadPuntos,
      direccionEnvio
    });

    await newUser.save();

    res.status(201).json({
      message: 'Usuario registrado con éxito',
      user: {
        id: newUser._id,
        nombre: newUser.nombre,
        correo: newUser.correo,
        fidelidadPuntos: newUser.fidelidadPuntos,
        direccionEnvio: newUser.direccionEnvio
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor', detalle: error.message });
  }
};

module.exports = {
  registerUser
};