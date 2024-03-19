const express = require('express');
const { protect } = require('../middlewares/authMiddleware');
const { accessChat, fetchChats, createGroupChat, renameGroup, addToGroup, removeFromGroup, deleteChat } = require('../controllers/chatControllers');

const router = express.Router();

// API Endpoints for /api/chat/
router.route('/').post(protect, accessChat);
router.route('/').get(protect, fetchChats);
router.route('/group').post(protect, createGroupChat);
router.route('/rename').put(protect, renameGroup);
router.route('/groupadd').put(protect, addToGroup);
router.route('/groupremove').put(protect, removeFromGroup);
router.route('/deletechat').put(protect, deleteChat);

module.exports = router;