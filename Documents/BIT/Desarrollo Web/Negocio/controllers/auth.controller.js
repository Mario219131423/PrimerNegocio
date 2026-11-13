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

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ correo: email });
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    if (user.contrasena !== password) {
      return res.status(401).json({ error: 'Contraseña incorrecta' });
    }

    res.status(200).json({
      message: 'Inicio de sesión exitoso',
      user: {
        id: user._id,
        nombre: user.nombre,
        correo: user.correo,
        fidelidadPuntos: user.fidelidadPuntos,
        direccionEnvio: user.direccionEnvio
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor', detalle: error.message });
  }
};

module.exports = {
  registerUser,
  loginUser
};