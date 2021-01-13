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
