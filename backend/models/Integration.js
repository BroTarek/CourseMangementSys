const mongoose = require('mongoose');

const integrationSchema = new mongoose.Schema({
  user: {
    type: String, // Ideally ObjectId ref to a User model
    required: true
  },
  provider: {
    type: String,
    enum: ['google', 'microsoft', 'zoom'],
    required: true
  },
  accessToken: {
    type: String,
    required: true
  },
  refreshToken: {
    type: String
  },
  expiresAt: {
    type: Date
  },
  profileData: {
    type: Object // Store basic profile info from provider
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true,
  // Ensure one provider per user
  indexes: [
    { key: { user: 1, provider: 1 }, unique: true }
  ]
});

module.exports = mongoose.model('Integration', integrationSchema);
