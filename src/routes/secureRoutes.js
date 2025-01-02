// src/routes/secureRoutes.js
const express = require('express');
const secureController = require('../controllers/secureController');
const verifyToken = require('../middleware/jwtMiddleware');

const router = express.Router();

/**
 * @swagger
 * /api/secure/protected:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Protected data accessed successfully
 *       401:
 *         description: Unauthorized
 */
router.get('/protected', verifyToken, secureController.getProtectedData);

module.exports = router;
