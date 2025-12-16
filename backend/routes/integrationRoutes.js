const express = require('express');
const router = express.Router();
const Integration = require('../models/Integration');
const axios = require('axios');

// Environment variables should be set for these
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const GOOGLE_REDIRECT_URI = process.env.GOOGLE_REDIRECT_URI || 'http://localhost:5000/api/integrations/google/callback';

const MS_CLIENT_ID = process.env.MS_CLIENT_ID;
const MS_CLIENT_SECRET = process.env.MS_CLIENT_SECRET;
const MS_REDIRECT_URI = process.env.MS_REDIRECT_URI || 'http://localhost:5000/api/integrations/microsoft/callback';

// --- GOOGLE CLASSROOM INTEGRATION ---

// @route   GET /api/integrations/google/connect
// @desc    Initiate Google OAuth Flow
router.get('/google/connect', (req, res) => {
  const scopes = [
    'https://www.googleapis.com/auth/classroom.courses.readonly',
    'https://www.googleapis.com/auth/classroom.rosters.readonly',
    'profile',
    'email'
  ];
  
  const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${GOOGLE_REDIRECT_URI}&response_type=code&scope=${scopes.join(' ')}&access_type=offline&prompt=consent`;
  
  res.redirect(url);
});

// @route   GET /api/integrations/google/callback
// @desc    Handle Google Callback
router.get('/google/callback', async (req, res) => {
  const { code } = req.query;
  
  try {
    // Exchange code for tokens
    // Note: This call will fail without valid credentials in .env
    /*
    const { data } = await axios.post('https://oauth2.googleapis.com/token', {
      client_id: GOOGLE_CLIENT_ID,
      client_secret: GOOGLE_CLIENT_SECRET,
      code,
      grant_type: 'authorization_code',
      redirect_uri: GOOGLE_REDIRECT_URI
    });
    */

    // MOCK IMPLEMENTATION FOR DEMO
    const mockData = {
        access_token: 'mock-google-access-token-' + Date.now(),
        refresh_token: 'mock-google-refresh-token',
        expiry_date: Date.now() + 3600000
    };

    // Save to DB (Assuming user ID is passed or from session - hardcoded 'student-1' for now)
    await Integration.findOneAndUpdate(
        { user: 'student-1', provider: 'google' },
        { 
            accessToken: mockData.access_token,
            refreshToken: mockData.refresh_token,
            expiresAt: new Date(mockData.expiry_date),
            isActive: true
        },
        { upsert: true, new: true }
    );

    res.send('Google Classroom Connected Successfully! You can close this window.');
  } catch (error) {
    console.error('Google Auth Error:', error.response?.data || error.message);
    res.status(500).send('Authentication Failed');
  }
});


// --- MICROSOFT TEAMS INTEGRATION ---

// @route   GET /api/integrations/microsoft/connect
// @desc    Initiate Microsoft OAuth Flow
router.get('/microsoft/connect', (req, res) => {
  const url = `https://login.microsoftonline.com/common/oauth2/v2.0/authorize?client_id=${MS_CLIENT_ID}&response_type=code&redirect_uri=${MS_REDIRECT_URI}&response_mode=query&scope=User.Read Team.ReadBasic.All offline_access`;
  
  res.redirect(url);
});

// @route   GET /api/integrations/microsoft/callback
// @desc    Handle Microsoft Callback
router.get('/microsoft/callback', async (req, res) => {
    const { code } = req.query;
  try {
    // Exchange logic would go here
    
    // MOCK SAVE
    await Integration.findOneAndUpdate(
        { user: 'student-1', provider: 'microsoft' },
        { 
            accessToken: 'mock-ms-access-token-' + Date.now(),
            isActive: true
        },
        { upsert: true, new: true }
    );

    res.send('Microsoft Teams Connected Successfully!');
  } catch (error) {
    res.status(500).send('Authentication Failed');
  }
});


// --- ZOOM INTEGRATION ---

// @route   GET /api/integrations/zoom/connect
// @desc    Initiate Zoom OAuth Flow
router.get('/zoom/connect', (req, res) => {
    // Zoom auth logic
    res.send('Redirecting to Zoom...');
});

// @route   GET /api/integrations/status
// @desc    Get connection status for current user
router.get('/status', async (req, res) => {
    try {
        const integrations = await Integration.find({ user: 'student-1' });
        
        const status = {
            google: integrations.some(i => i.provider === 'google' && i.isActive),
            microsoft: integrations.some(i => i.provider === 'microsoft' && i.isActive),
            zoom: integrations.some(i => i.provider === 'zoom' && i.isActive),
        };
        
        res.json({ success: true, data: status });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

module.exports = router;
