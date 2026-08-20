const pool = require('../config/db');

// Obtener todas las vacantes activas
exports.getJobs = async (req, res) => {
  try {
    const jobs = await pool.query("SELECT * FROM jobs WHERE status = 'active' ORDER BY created_at DESC");
    res.json(jobs.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener empleos' });
  }
};

// Publicar una nueva vacante
exports.createJob = async (req, res) => {
  const { company_id, title, description, salary_min, salary_max } = req.body;

  try {
    const newJob = await pool.query(
      'INSERT INTO jobs (company_id, title, description, salary_min, salary_max) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [company_id, title, description, salary_min, salary_max]
    );

    res.status(201).json({ message: 'Vacante publicada', job: newJob.rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al publicar la vacante' });
  }
};