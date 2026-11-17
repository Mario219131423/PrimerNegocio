require('dotenv').config();
const connectDB = require('./config/db');
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

app.use(cors());
app.use(express.json());

const authRoutes = require('./routes/auth.routes');
app.use('/api/users', authRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'Servidor funcionando correctamente ' });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});