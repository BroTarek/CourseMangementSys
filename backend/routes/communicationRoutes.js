const express = require('express');
const router = express.Router();
const Message = require('../models/Message');
const Announcement = require('../models/Announcement');

// @route   GET /api/communication/messages/:group
// @desc    Get messages for a group
router.get('/messages/:group', async (req, res) => {
  try {
    const messages = await Message.find({ group: req.params.group }).sort({ createdAt: 1 });
    res.status(200).json({ success: true, data: messages });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// @route   POST /api/communication/messages
// @desc    Save a message (usually handled via socket, but good for backup)
router.post('/messages', async (req, res) => {
  try {
    const message = await Message.create(req.body);
    res.status(201).json({ success: true, data: message });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

// @route   GET /api/communication/announcements
// @desc    Get all announcements
router.get('/announcements', async (req, res) => {
  try {
    const announcements = await Announcement.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: announcements });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// @route   POST /api/communication/announcements
// @desc    Create announcement
router.post('/announcements', async (req, res) => {
  try {
    const announcement = await Announcement.create(req.body);
    res.status(201).json({ success: true, data: announcement });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

module.exports = router;
