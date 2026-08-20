const express = require('express');
const router = express.Router();
const companyController = require('../controllers/companyController');
const verifyToken = require('../middlewares/authMiddleware');

// Ver postulantes de una vacante
router.get('/jobs/:jobId/applications', verifyToken, companyController.getJobApplications);

// Actualizar estado de postulante
router.put('/applications/:applicationId/status', verifyToken, companyController.updateApplicationStatus);

module.exports = router;