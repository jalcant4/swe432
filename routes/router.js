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

// export
module.exports = router