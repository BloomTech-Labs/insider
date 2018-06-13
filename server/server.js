const express = require('express');
const cors = require('cors');
// All routes located here
const apiRoutes = require('./controllers/routes/api-routes');

// const authRoutes = require('./routes/auth-routes');
// const isLoggedIn = require('./controllers/isLoggedIn');

const corsOptions = {
  origin: '*',
  credentials: true,
};

const app = express();

app.use(cors(corsOptions));

// You can add in any routes you want as you import them
app.use('/api', /* isLoggedIn, */ apiRoutes);

// server.use('/', authRoutes);

module.exports = app;
