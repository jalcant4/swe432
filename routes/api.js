// ./routes/api.js
const express = require('express');
const router = express.Router();
const Image = require('../models/image.js');

// Define a route to get all images
router.get('/images', async (req, res) => {
  try {
    const images = await Image.find({});
    res.json(images);
  } catch (error) {
    console.error('Error fetching images:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;