require('dotenv').config();

const express = require('express');
const path = require('path');
const app = require('./server');

// Imports server.js and app.js creates a connection containing the routes and middleware

// mongoose.Promise = global.Promise;
// mongoose.connect(
//   process.env.URI,
//   {},
//   (err) => {
//     if (err) throw new Error(err);
//     console.log('DB up and running');
//   },
// );

// Serve static files from the React app
if (process.env.DEV === undefined) {
  app.use(express.static(path.join(__dirname, '../client/build')));

  // The "catchall" handler: for any request that doesn't
  // match one above, send back React's index.html file.
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
  });
}

const PORT = process.env.PORT || 5050;

app.listen(PORT, () => {
  console.log(`Magic happening on port ${PORT}`);
});

module.exports = app;
