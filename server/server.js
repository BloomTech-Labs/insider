const express = require('express');
const cors = require('cors');

const apiRoutes = require('./controllers/routes/api-routes');
const { envCheck } = require('./models/middleware/middleware');

const corsOptions = {
  origin: '*',
  credentials: true,
};

const server = express();

server.use(cors(corsOptions));

// You can add in any routes you want as you import them
server.use('/api', envCheck, apiRoutes);

module.exports = server;
