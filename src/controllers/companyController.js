const pool = require('../config/db');

// Obtener todos los candidatos postulados a las vacantes de la empresa
exports.getJobApplications = async (req, res) => {
  const { jobId } = req.params;

  try {
    const applications = await pool.query(
      `SELECT a.id AS application_id, a.status, a.applied_at, u.id AS user_id, u.name, u.email 
       FROM applications a 
       JOIN users u ON a.user_id = u.id 
       WHERE a.job_id = $1`,
      [jobId]
    );

    res.json(applications.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener postulantes' });
  }
};

// Cambiar estado de una postulación (en_revision, aceptado, rechazado)
exports.updateApplicationStatus = async (req, res) => {
  const { applicationId } = req.params;
  const { status } = req.body;

  try {
    const updated = await pool.query(
      'UPDATE applications SET status = $1 WHERE id = $2 RETURNING *',
      [status, applicationId]
    );

    if (updated.rows.length === 0) {
      return res.status(404).json({ message: 'Postulación no encontrada' });
    }

    res.json({
      message: 'Estado de la postulación actualizado con éxito',
      application: updated.rows[0]
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al actualizar estado' });
  }
};