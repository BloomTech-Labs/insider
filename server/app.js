require('dotenv').config();
// const mongoose = require('mongoose');
const app = require('./server');

// Imports server.js and app.js creates a connection containing the routes and middleware

const port = process.env.PORT || 5050;
// mongoose.Promise = global.Promise;
// mongoose.connect(
//   process.env.URI,
//   {},
//   (err) => {
//     if (err) throw new Error(err);
//     console.log('DB up and running');
//   },
// );

app.listen(port, () => {
  console.log(`Magic happening on port ${port}`);
});
module.exports = app