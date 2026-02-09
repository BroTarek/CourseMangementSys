const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  sender: {
    type: String, // Storing name or ID for simplicity for now
    required: true
  },
  group: {
    type: String,
    default: 'general'
  },
  content: {
    type: String,
    required: true
  },
  attachments: [{
    type: String
  }],
  readBy: [{
    type: String
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model('Message', messageSchema);
