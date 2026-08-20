const express = require('express');
const router = express.Router();
const applicationController = require('../controllers/applicationController');
const verifyToken = require('../middlewares/authMiddleware');

// Ambas rutas requieren autenticación
router.post('/', verifyToken, applicationController.applyToJob);
router.get('/my-applications', verifyToken, applicationController.getMyApplications);

module.exports = router;s