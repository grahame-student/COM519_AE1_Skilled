require('dotenv').config();
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const expressSession = require('express-session');

/**
 * Controllers (route handlers).
 */
const homeController = require('./controllers/home');

/**
 * API Controllers
 */
const getData = require('./controllers/api/v1/getChartData');

const app = express();
app.set('view engine', 'ejs');

const { PORT, MONGODB_URI, SESSION_SECRET } = process.env;

/**
 * connect to database
 */

mongoose.connect(MONGODB_URI, { useNewUrlParser: true });
mongoose.connection.on('error', (err) => {
  console.error(err);
  console.log(
    'MongoDB connection error. Please make sure MongoDB is running.'
  );
  process.exit();
});

/**
 * Apply middle wear
 */
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(expressSession({ secret: SESSION_SECRET, cookie: { expires: new Date(253402300000000) } }));

/**
 * Configure Routes
 */
app.get('/', homeController.list);

app.get('/logout', async (req, res) => {
  req.session.destroy();
  global.user = false;
  res.redirect('/');
});

/**
 * Configure API Routes
 */
app.get('/api/v1/chart', getData.chart);
app.get('/api/v1/chartGroup', getData.groups);
app.get('/api/v1/chartData', getData.data);

app.listen(PORT, () => {
  console.log(`Skilled app listening at http://localhost:${PORT}`);
});
