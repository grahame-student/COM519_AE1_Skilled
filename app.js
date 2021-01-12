require('dotenv').config();
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const expressSession = require('express-session');
const multer = require('multer');
const upload = multer();

/**
 * Controllers (route handlers).
 */
const homeController = require('./controllers/home');
const skillsController = require('./controllers/skills');
const rolesController = require('./controllers/roles');
const employeesController = require('./controllers/employees');

/**
 * API Controllers
 */
const chartApiController = require('./controllers/api/v1/getChartData');
const skillGroupApiController = require('./controllers/api/v1/skillGroups');
const skillApiController = require('./controllers/api/v1/skills');
const roleApiController = require('./controllers/api/v1/roles');
const requiredSkillsApiController = require('./controllers/api/v1/requiredSkills');
const employeeApiController = require('./controllers/api/v1/employees');

const app = express();
app.set('view engine', 'ejs');

const { PORT, MONGODB_URI, SESSION_SECRET } = process.env;

/**
 * connect to database
 */

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
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
app.use(bodyParser.urlencoded({ extended: true }));

app.use(expressSession({ secret: SESSION_SECRET, cookie: { expires: new Date(253402300000000) } }));

/**
 * Configure Routes
 */
app.get('/', homeController.list);

app.get('/edit-skills', skillsController.list);
app.get('/edit-roles', rolesController.list);
app.get('/edit-employees', employeesController.list);

// TODO: Not yet implemented
app.get('/logout', async (req, res) => {
  req.session.destroy();
  global.user = false;
  res.redirect('/');
});

/**
 * Configure v1 API Routes
 */
// charting API endpoints
app.get('/api/v1/chart', chartApiController.chart);
app.get('/api/v1/chartGroup', chartApiController.groups);
app.get('/api/v1/chartData', chartApiController.data);

// skill groups API endpoints
app.get('/api/v1/groups', skillGroupApiController.getAll); // Get all skill groups
app.get('/api/v1/group', skillGroupApiController.list); // Get list of skill groups
app.get('/api/v1/group/:group', skillGroupApiController.request); // Get single skill group
app.delete('/api/v1/group/:group', skillGroupApiController.delete); // remove single skill group
app.post('/api/v1/group', skillGroupApiController.add); // add new skill group
app.patch('/api/v1/group/:group', skillGroupApiController.update); // update single skill groups

// skills API endpoints
app.delete('/api/v1/skill/:group/:skill', skillApiController.delete); // remove single skill from a skill group
app.post('/api/v1/skill/:group', skillApiController.add); // add skills to a skill group
app.patch('/api/v1/skill/:group/:skill', skillApiController.update); // update single skill from a skill group

// role API endpoints
app.get('/api/v1/role', roleApiController.list); // Get list of all job roles
app.get('/api/v1/role/:title/skill', roleApiController.requestSkills); // Get latest requirements for job role (latest date)
app.delete('/api/v1/role/:title', roleApiController.delete); // remove single role
app.post('/api/v1/role/:title', roleApiController.add); // create a new job role with the passed in title, all skill requirements will be set to 0
app.patch('/api/v1/role/:title', roleApiController.update); // update single role

// requiredSkills API endpoints
app.patch('/api/v1/requiredSkills/:title', upload.none(), requiredSkillsApiController.add); // save new skill requirements to job role

// employee API endpoints
app.get('/api/v1/employees', employeeApiController.list); // get a list of all employee names
app.get('/api/v1/employee/:email', employeeApiController.request); // get single employee by email
app.delete('/api/v1/employee/:email', employeeApiController.delete); // remove single employee by email
app.post('/api/v1/employee', employeeApiController.add); // add a new employee

/**
 * Start listening for incoming traffic
 */
app.listen(PORT, () => {
  console.log(`Skilled app listening at http://localhost:${PORT}`);
});
