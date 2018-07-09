const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

const apiRoutes = require('./controllers/routes/api-routes');
const { envCheck } = require('./models/middleware/middleware');

const corsOptions = {
  origin: '*',
  credentials: true,
};

app.use(cors(corsOptions));

app.use(express.static(path.join(__dirname, '../client/build')), apiRoutes);

// You can add in any routes you want as you import them
app.use('/api', envCheck, apiRoutes);

const server = require('http').Server(app);
const io = require('socket.io')(server);

module.exports = {
  server,
  io,
};
