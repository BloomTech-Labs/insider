const express = require('express')();
const cors = require('cors');

const apiRoutes = require('./controllers/routes/api-routes');
const { envCheck } = require('./models/middleware/middleware');

const corsOptions = {
  origin: '*',
  credentials: true,
};

express.use(cors(corsOptions));

// You can add in any routes you want as you import them
express.use('/api', envCheck, apiRoutes);

const server = require('http').Server(express);
const io = require('socket.io')(server);

module.exports = {
  server,
  io,
};
