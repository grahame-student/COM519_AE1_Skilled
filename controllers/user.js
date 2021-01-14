const User = require('../models/User');

exports.join = async (req, res) => {
  try {
    const sanitise = require('mongo-sanitize');
    const email = sanitise(req.body['user-email']);
    const user = await User.findOne({ email: email });

    let message;
    if (user == null) {
      const newUser = new User({ email: req.body['user-email'], password: req.body['user-password'] });
      await newUser.save();

      message = 'User registered';

      const confirmedUser = await User.findOne({ email: email });
      console.log(confirmedUser);
    } else {
      message = 'That email is already registered';
    }
    res.render('index', { message: message });
  } catch (e) {
    res.status(404).send({
      message: 'error rendering page'
    });
  }
};

exports.signin = async (req, res) => {
  try {
    console.log(`signing user in: ${req.body['user-email']}`);
    const sanitise = require('mongo-sanitize');
    const email = sanitise(req.body['user-email']);
    const user = await User.findOne({ email: email });
    if (user != null) {
      const bcrypt = require('bcrypt');
      const match = await bcrypt.compare(req.body['user-password'], user.password);

      if (match) {
        req.session.userID = user._id;
        global.user = user;
        res.render('index', { message: `User ${user.email} logged in` });
        return;
      }
    }
    res.render('index', { message: null });
  } catch (e) {
    console.log(e);
    res.status(404).send({
      message: 'error rendering page'
    });
  }
};

exports.session = async (req, res, next) => {
  if (req.session.userID && !global.user) {
    const sessionUser = await User.findById(req.session.userID);
    if (sessionUser != null) {
      global.user = sessionUser;
      console.log('global user set to:', global.user);
    }
  }
  next();
};

exports.logout = async (req, res) => {
  console.log('logging user out');
  req.session.destroy();
  global.user = false;
  res.redirect('/');
};

exports.authMiddleware = async (req, res, next) => {
  const sessionUser = await User.findById(req.session.userID);
  if (!sessionUser) {
    return res.redirect('/');
  }
  next();
};
