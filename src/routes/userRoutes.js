const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para interpretar JSON
app.use(express.json());

// 1. Importar todas las rutas
const authRoutes = require('./routes/authRoutes');
const jobRoutes = require('./routes/jobroutes');
const applicationRoutes = require('./routes/applicationRoutes');
const userRoutes = require('./routes/userRoutes');

// 2. Registrar las rutas en la API
app.use('/api/auth', authRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/applications', applicationRoutes);
app.use('/api/users', userRoutes);

// Ruta principal de verificación
app.get('/', (req, res) => {
  res.json({ message: 'API Tu Trabajo Ya - Operativa' });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});