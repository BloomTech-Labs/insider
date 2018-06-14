const express = require('express');
const cors = require('cors');
// All routes located here
const apiRoutes = require('./controllers/routes/api-routes');
const { envCheck } = require('./models/middleware/middleware');
// const authRoutes = require('./routes/auth-routes');
// const isLoggedIn = require('./controllers/isLoggedIn');

const corsOptions = {
  origin: '*',
  credentials: true,
};

const server = express();

server.use(cors(corsOptions));

// You can add in any routes you want as you import them
server.use('/api', /* isLoggedIn, */envCheck, apiRoutes);

// server.use('/', authRoutes);

module.exports = server;
