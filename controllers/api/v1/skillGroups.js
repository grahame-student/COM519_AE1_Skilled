const SkillSet = require('../../../models/SkillSet');

exports.getAll = async (req, res, next) => {
  console.log('Requesting all skill groups');

  const query = SkillSet.find({});
  query.exec(function (err, someValue) {
    if (err) return next(err);
    res.send(someValue);
  });
};

exports.list = async (req, res, next) => {
  console.log('Requesting list of skill groups');

  const query = SkillSet.find({}).select('group -_id');
  query.exec(function (err, someValue) {
    if (err) return next(err);
    res.send(someValue);
  });
};

exports.request = async (req, res, next) => {
  const field = req.params.group;
  console.log('Requesting skill group');
  console.log('Group:                  ', field);

  const query = SkillSet.findOne({ group: field });
  query.exec(function (err, someValue) {
    if (err) return next(err);
    res.send(someValue);
  });
};

exports.delete = async (req, res, next) => {
  const field = req.params.group;
  console.log('Deleting skill group');
  console.log('Group:                  ', field);

  const query = SkillSet.findOneAndDelete({ group: field });
  query.exec(function (err, someValue) {
    if (err) return next(err);
    res.send(someValue);
  });
};

exports.add = async (req, res, next) => {
  const field = req.body.group;
  console.log('Adding skill group');
  console.log('Group:                  ', field);

  const group = new SkillSet({ group: field });
  await group.save();

  const query = SkillSet.findOne({ group: field });
  await query.exec(function (err, someValue) {
    if (err) return next(err);
    res.send(someValue);
  });
};

exports.update = async (req, res, next) => {
  const oldGroup = req.params.group;
  const newGroup = req.body.group;
  console.log('Changing skill group');
  console.log('From:                   ', oldGroup);
  console.log('To  :                   ', newGroup);

  let group;
  await SkillSet.findOne({ group: oldGroup })
    .then(result => {
      group = result;
    })
    .catch(handleErrors);

  group.group = newGroup;
  await group.save();

  const query = SkillSet.findOne({ group: newGroup });
  await query.exec(function (err, someValue) {
    if (err) return next(err);
    res.send(someValue);
  });
};

async function handleErrors (error) {
  console.log(error);
}
