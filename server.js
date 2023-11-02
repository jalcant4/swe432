// server with node js
// imports the express library and sets an instance as an app
const express = require('express')
const app = express()
const path = require('path')
const viewsRouter = require('./routes/router')
const data = require('./public/data/data');
const PORT = 8080

// rendering by a view engine: ejs
app.set('view engine', 'ejs')
app.set('views', './views')

// middleware
app.use(express.static(path.join(__dirname, 'public')))
app.use("/views", viewsRouter)

// get methods retrieve a resource
app.get("/", (req, res) => {
    res.render('index')
})

// a route to serve the data
app.get('/api/data', (req, res) => {
    res.json(data);
});

// listen to requests
app.listen(PORT, () => console.log('Running express server on port:', PORT))