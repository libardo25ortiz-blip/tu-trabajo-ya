const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware JSON y Archivos Estáticos
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

// Importar rutas
const authRoutes = require('./routes/authRoutes');
const jobRoutes = require('./routes/jobroutes');
const applicationRoutes = require('./routes/applicationRoutes');
const userRoutes = require('./routes/userRoutes');
const companyRoutes = require('./routes/companyRoutes');

// Usar rutas
app.use('/api/auth', authRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/applications', applicationRoutes);
app.use('/api/users', userRoutes);
app.use('/api/company', companyRoutes);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});