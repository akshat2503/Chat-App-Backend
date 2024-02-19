const express = require('express');
const { protect } = require('../middlewares/authMiddleware');
const { accessChat, fetchChats, createGroupChat } = require('../controllers/chatControllers');

const router = express.Router();

router.route('/').post(protect, accessChat);
router.route('/').get(protect, fetchChats);
router.route('/group').post(protect, createGroupChat);
// router.route('/group').put(protect, renameGroup);
// router.route('/groupremove').put(protect, renameFromGroup);
// router.route('/groupadd').put(protect, addToGroup);

module.exports = router;