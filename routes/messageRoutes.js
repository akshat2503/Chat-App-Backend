const express = require('express');
const { protect } = require('../middlewares/authMiddleware');
const { sendMessage, allMessages } = require('../controllers/messageControllers');

const router = express.Router();

// API Endpoints for /api/message/
router.route('/').post(protect, sendMessage);
router.route('/:chatId').get(protect, allMessages);

module.exports = router;