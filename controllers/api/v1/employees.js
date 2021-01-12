const Employee = require('../../../models/Employee');

exports.list = async (req, res, next) => {
  console.log('Requesting list of all Employees');

  const query = Employee.find({}).select('name email -_id');
  query.exec(function (err, someValue) {
    if (err) return next(err);
    res.send(someValue);
  });
};

exports.request = async (req, res, next) => {
  const email = req.params.email;
  console.log('Requesting employee');
  console.log('Email:                  ', email);

  const query = Employee.findOne({ email: email });
  query.exec(function (err, someValue) {
    if (err) return next(err);
    res.send(someValue);
  });
};
