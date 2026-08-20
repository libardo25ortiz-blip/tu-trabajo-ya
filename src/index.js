const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para JSON
app.use(express.json());

// Importar rutas
const authRoutes = require('./routes/authRoutes');
const jobRoutes = require('./routes/jobroutes'); // Cambiado a 'jobroutes'

// Usar rutas
app.use('/api/auth', authRoutes);
app.use('/api/jobs', jobRoutes);

// Ruta base
app.get('/', (req, res) => {
  res.json({ message: 'API Tu Trabajo Ya - Operativa' });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});