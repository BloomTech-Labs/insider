
const router = express.Router();

server.use(express.json());

/* GET home page. */
server.get('/', (req, res) => {
  res.send('Anonymous Texts');
});


