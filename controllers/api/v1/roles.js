const Role = require('../../../models/Role');

exports.list = async (req, res, next) => {
  console.log('Requesting list of job roles');

  const query = Role.find({}).select('title -_id');
  query.exec(function (err, someValue) {
    if (err) return next(err);
    res.send(someValue);
  });
};

exports.requestSkills = async (req, res) => {
  const title = req.params.title;
  console.log('Requesting latest job role requirements');
  console.log('Title:                  ', title);

  let result = await Role.aggregate()
    .match({ title: title })
    .unwind('required skills')
    .sort( { 'required skills.timestamp': -1 });

  res.send(result[0]);
}
