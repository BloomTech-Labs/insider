
const router = express.Router();

server.use(express.json());
server.use(morgan('combined'));

const Models = require('./models/models');

/* GET home page. */
server.get('/', (req, res) => {
  res.send('Anonymous Texts');
});

module.exports = server;