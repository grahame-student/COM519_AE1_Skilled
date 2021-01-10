const SkillSet = require('../../../models/SkillSet');

exports.add = async (req, res, next) => {
  const group = req.params.group;
  const skillList = req.body.skills;
  console.log('Adding skill(s)');
  console.log('Group :                 ', group);
  console.log('Skills:                 ', skillList);

  let requestedGroup;
  await SkillSet.findOne({ group: group })
    .then(result => {
      requestedGroup = result;
    })
    .catch(handleErrors);

  // TODO: merge skill list into the requestedGroup
  // requestedGroup.group = newGroup;

  // merge then assign unique values
  // Based on: https://stackoverflow.com/questions/1960473/get-all-unique-values-in-a-javascript-array-remove-duplicates
  const mergedSkills = requestedGroup.skills.concat(skillList);
  requestedGroup.skills = mergedSkills.filter((v, i, a) => a.indexOf(v) === i);
  // FIXME: the items in new skills list may have extra spaces / or be empty
  console.log(requestedGroup.skills.toString());
  await requestedGroup.save();

  const query = SkillSet.findOne({ group: group });
  await query.exec(function (err, someValue) {
    if (err) return next(err);
    res.send(someValue);
  });
};

async function handleErrors (error) {
  console.log(error);
}
