const pool = require('../config/db');

// Obtener perfil del usuario autenticado
exports.getProfile = async (req, res) => {
  const userId = req.user.id;

  try {
    const user = await pool.query(
      'SELECT id, name, email, role, created_at FROM users WHERE id = $1',
      [userId]
    );

    if (user.rows.length === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    res.json(user.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener el perfil' });
  }
};

// Actualizar nombre del usuario
exports.updateProfile = async (req, res) => {
  const userId = req.user.id;
  const { name } = req.body;

  try {
    const updatedUser = await pool.query(
      'UPDATE users SET name = $1 WHERE id = $2 RETURNING id, name, email, role',
      [name, userId]
    );

    res.json({
      message: 'Perfil actualizado con éxito',
      user: updatedUser.rows[0]
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al actualizar el perfil' });
  }
};