const express = require('express')();
const cors = require('cors');
const path = require('path');

const apiRoutes = require('./controllers/routes/api-routes');
const { envCheck } = require('./models/middleware/middleware');

const corsOptions = {
  origin: '*',
  credentials: true,
};

express.use(cors(corsOptions));

if (process.env.DEV !== 'development') {
  express.use(express.static(path.join(__dirname, '../client/build')));
  // The "catchall" handler: for any request that doesn't
  // match one above, send back React's index.html file.
}

// You can add in any routes you want as you import them
express.use('/api', envCheck, apiRoutes);

const server = require('http').Server(express);
const io = require('socket.io')(server);

module.exports = {
  server,
  io,
};
