const express = require('express');
const { registerUser, authUser, allUsers } = require('../controllers/userControllers');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

// API Endpoints for /api/user/
router.route('/').post(registerUser).get(protect, allUsers);
router.route('/login').post(authUser);

module.exports = router;