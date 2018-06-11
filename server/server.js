require('dotenv').config()
const express = require('express');
const server = express();
const router = express.Router();

server.use(express.json());

/* GET home page. */
server.get('/', function(req, res) {
    res.send('Anonymous Texts');
});

server.listen(3000, () => console.log('Example app listening on port 3000!'))