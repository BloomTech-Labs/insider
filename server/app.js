require('dotenv').config();
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

const PORT = process.env.PORT || 5050;

app.listen(PORT, () => {
  console.log(`Magic happening on port ${PORT}`);
});

module.exports = app;
