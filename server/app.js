require('dotenv').config();

const express = require('express');
const path = require('path');
const app = require('./server');

// Imports server.js and app.js creates a connection containing the routes and middleware

// Serve static files from the React app
if (process.env.DEV !== 'development') {
  app.use(express.static(path.join(__dirname, '../client/build')));

  // The "catchall" handler: for any request that doesn't
  // match one above, send back React's index.html file.
  app.get('*', (req, res) => {
    res.status(404).sendFile(path.join(__dirname, '../client/build/index.html'));
  });
}

const PORT = process.env.PORT || 5050;

app.listen(PORT, () => {
  console.log(`Magic happening on port ${PORT}`);
});

module.exports = app;
