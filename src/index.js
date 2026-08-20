const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para JSON
app.use(express.json());

// 1. Importar rutas primero
const authRoutes = require('./routes/authRoutes');
const jobRoutes = require('./routes/jobroutes');
const applicationRoutes = require('./routes/applicationRoutes');

// 2. Usar rutas después
app.use('/api/auth', authRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/applications', applicationRoutes);

// Ruta base
app.get('/', (req, res) => {
  res.json({ message: 'API Tu Trabajo Ya - Operativa' });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});