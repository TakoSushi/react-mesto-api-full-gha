require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const routes = require('./routes');

const { PORT = 8080, DB_URL = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});
mongoose.connect(DB_URL)
  .then(() => {
    console.log('connected to bd');
  })
  .catch(() => console.log('No connection'));

const app = express();

app.use(cors());
// app.use(cors({
//   origin: 'https://kuzora-petr.nomoredomains.work',
//   credentials: true,
// }));

app.use(cookieParser());
app.use(helmet());
app.use(bodyParser.json());

app.use(limiter, routes);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use(routes);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
