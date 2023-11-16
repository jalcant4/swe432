// a router modulizes requests and handling
const express = require("express")
const app = express()
const router = express.Router()


// rendering by a view engine: ejs
app.set('view engine', 'ejs')

// render index
router.get('/index', (req, res) => {
    res.render("index")
})

// render playlists
router.get('/playlists', (req, res) => {
    res.render("playlists")
})

// render timeslots
router.get('/timeslots', (req, res) => {
    res.render("timeslots")
})

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

// export
module.exports = router