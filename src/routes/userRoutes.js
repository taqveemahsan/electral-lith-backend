// src/routes/userRoutes.js
const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

router.post('/create', userController.createUser);
router.get('/:id', userController.getUserById);
router.post('/search', userController.searchUsers);
router.delete('/:id', userController.deleteUser);

module.exports = router;
