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

  const result = await Role.aggregate()
    .match({ title: title })
    .unwind('required skills')
    .sort({ 'required skills.timestamp': -1 });

  res.send(result[0]);
};

exports.add = async (req, res) => {
  const title = req.params.title;
  const formData = req.body;
  console.log('Saving Role Requirements');
  console.log('Title :                 ', title);
  console.log(formData);

  // let requestedGroup;
  // await SkillSet.findOne({ group: group })
  //   .then(result => {
  //     requestedGroup = result;
  //   })
  //   .catch(handleErrors);
  //
  // // merge then assign unique values
  // // Based on: https://stackoverflow.com/questions/1960473/get-all-unique-values-in-a-javascript-array-remove-duplicates
  // const mergedSkills = requestedGroup.skills.concat(skillList);
  // requestedGroup.skills = mergedSkills.filter((v, i, a) => a.indexOf(v) === i);
  // // FIXME: the items in new skills list may have extra spaces / or be empty
  // console.log(requestedGroup.skills.toString());
  // await requestedGroup.save();
  //
  // const query = SkillSet.findOne({ group: group });
  // await query.exec(function (err, someValue) {
  //   if (err) return next(err);
  //   res.send(someValue);
  // });
  res.send(formData);
};