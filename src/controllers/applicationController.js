const pool = require('../config/db');

// Postularse a una vacante (requiere token de candidato)
exports.applyToJob = async (req, res) => {
  const { job_id } = req.body;
  const user_id = req.user.id; // Obtenido del token JWT

  try {
    // Verificar si ya se postuló previamente
    const existing = await pool.query(
      'SELECT * FROM applications WHERE job_id = $1 AND user_id = $2',
      [job_id, user_id]
    );

    if (existing.rows.length > 0) {
      return res.status(400).json({ message: 'Ya te has postulado a esta vacante.' });
    }

    const newApplication = await pool.query(
      'INSERT INTO applications (job_id, user_id) VALUES ($1, $2) RETURNING *',
      [job_id, user_id]
    );

    res.status(201).json({
      message: 'Postulación registrada con éxito',
      application: newApplication.rows[0]
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al procesar la postulación' });
  }
};

// Consultar mis postulaciones
exports.getMyApplications = async (req, res) => {
  const user_id = req.user.id;

  try {
    const applications = await pool.query(
      `SELECT a.id, a.applied_at, a.status, j.title, j.description 
       FROM applications a 
       JOIN jobs j ON a.job_id = j.id 
       WHERE a.user_id = $1 
       ORDER BY a.applied_at DESC`,
      [user_id]
    );

    res.json(applications.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener tus postulaciones' });
  }
};