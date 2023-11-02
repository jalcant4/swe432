const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const ejs = require('ejs');

// Use the cookie-parser middleware
app.use(cookieParser());

// Serve static files (such as about.ejs)
app.use(express.static('/expdb'));

// Route to set the user's name in a cookie
app.get('/setname', (req, res) => {
  const { name } = req.query;
  if (name) {
    // Set a cookie with the user's name
    res.cookie('username', name, { maxAge: 24 * 60 * 60 * 1000, httpOnly: true });
    res.redirect('/about');
  } else {
    res.status(400).send('Bad Request: Please provide a name.');
  }
});

// Route to display the user's name from the cookie
app.get('/about', (req, res) => {
  const username = req.cookies.username || '';
  // Render the about.ejs template with the username
  ejs.renderFile('expdb/about.ejs', { username }, (err, html) => {
    if (err) {
      res.status(500).send('Internal Server Error');
    } else {
      res.send(html);
    }
  });
});

// Start the Express server
const port = 8080;
app.listen(port, () => {
  console.log(`Server running at http://127.0.0.1:${port}/`);
});