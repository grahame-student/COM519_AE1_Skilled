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

exports.delete = async (req, res, next) => {
  const email = req.params.email;
  console.log('Deleting employee');
  console.log('Email:                  ', email);

  const query = Employee.findOneAndDelete({ email: email });
  query.exec(function (err, someValue) {
    if (err) return next(err);
    res.send(someValue);
  });
};

exports.add = async (req, res, next) => {
  const uniqueString = require('unique-string');
  const email = `a.b@${uniqueString()}.com`;
  console.log('Adding employee(s)');
  console.log('Email:                  ', email);

  const employee = new Employee({ name: 'new employee', email: email, 'job title': 'no job title' });
  await employee.save();
  console.log(employee);

  const query = Employee.findOne({ email: email });
  query.exec(function (err, someValue) {
    if (err) return next(err);
    res.status(201).json(someValue);
  });
};
