require('dotenv').config();

const fs = require('fs');
const path = require('path');
const chokidar = require('chokidar');

const { server, io } = require('./server');
const { messagesFeed } = require('./models/models');
// Imports server.js and app.js creates a connection containing the routes and middleware

// Serve static files from the React app

io.sockets.on('connection', (socket) => {
  const watcher = chokidar.watch(path.join(__dirname, './models/messages/messages.json'), { persistent: true });
  const sendMessages = () => {
    fs.readFile(
      path.join(__dirname, './models/messages/messages.json'),
      'utf8',
      (err, data) => {
        console.log(data)
        if (err) socket.emit('socket-error', err);
        socket.emit('message-feed', data);
      },
    );
  };

  messagesFeed()
    .then(() => {})
    .then(sendMessages())
    .catch((err) => {
      sendMessages();
      console.error(err);
    });
  watcher.on('change', sendMessages());
  // fs.watch(path.join(__dirname, './models/messages/messages.json'), (event, filename) => {
  //   console.log(event, filename)
  //   if (event === 'change') sendMessages();
  // });
});

const PORT = process.env.PORT || 3030;

server.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});

module.exports = server;
