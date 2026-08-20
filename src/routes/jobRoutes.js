const express = require('express');
const router = express.Router();
const jobController = require('../controllers/jobController');
const verifyToken = require('../middlewares/authMiddleware');

// Ver vacantes (público)
router.get('/', jobController.getJobs);

// Crear vacante (requiere token JWT)
router.post('/', verifyToken, jobController.createJob);

module.exports = router;