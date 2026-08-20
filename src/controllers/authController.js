const pool = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Registrar Candidato o Empresa
exports.register = async (req, res) => {
  const { email, password, role } = req.body;

  try {
    // Validar si el usuario ya existe
    const userExist = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (userExist.rows.length > 0) {
      return res.status(400).json({ message: 'El correo ya está registrado' });
    }

    // Encriptar contraseña
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    // Guardar usuario en la base de datos
    const newUser = await pool.query(
      'INSERT INTO users (email, password_hash, role) VALUES ($1, $2, $3) RETURNING id, email, role',
      [email, passwordHash, role]
    );

    res.status(201).json({
      message: 'Usuario registrado exitosamente',
      user: newUser.rows[0]
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error en el servidor al registrar' });
  }
};

// Iniciar Sesión (Login)
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (result.rows.length === 0) {
      return res.status(400).json({ message: 'Credenciales inválidas' });
    }

    const user = result.rows[0];
    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(400).json({ message: 'Credenciales inválidas' });
    }

    // Generar Token JWT
    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '8h' }
    );

    res.json({
      message: 'Inicio de sesión exitoso',
      token,
      user: { id: user.id, email: user.email, role: user.role }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error en el servidor al iniciar sesión' });
  }
};