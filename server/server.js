require('dotenv').config()
const router = express.Router();

server.use(express.json());
server.use(morgan('combined'));

const models = require('./models/models');

/* GET home page. */
server.get('/', (req, res) => {
  res.send('Anonymous Texts');
});

module.exports = server;