const mongoose = require('mongoose');
const server = require('./server');

// Imports server.js and app.js creates a connection containing the routes and middleware

const port = 5050;
// mongoose.Promise = global.Promise;
// mongoose.connect(
//   'mongodb://localhost/anonymous',
//   {},
//   (err) => {
//     if (err) throw new Error(err);
//     console.log('DB up and running');
//   },
// );

server.listen(port, () => {
  console.log(`Magic happening on port ${port}`);
});
