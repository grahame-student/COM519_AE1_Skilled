const SkillSet = require("../../../models/SkillSet");

exports.list = async (req, res, next) => {
  console.log('Requesting list of skill groups');
  const query = SkillSet.find({}).select('group -_id');

  query.exec(function (err, someValue) {
    if (err) return next(err);
    res.send(someValue);
  });
}

exports.request = async (req, res, next) => {
  const field = req.params.group;
  const q = req.query.q;
  console.log('Requesting skill group: ');
  console.log('Group:                  ', field);
  const query = SkillSet.findOne({ group: field });

  query.exec(function (err, someValue) {
    if (err) return next(err);
    res.send(someValue);
  });
}
