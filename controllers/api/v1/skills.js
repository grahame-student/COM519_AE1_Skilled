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

exports.delete = async (req, res, next) => {
  const group = req.params.group;
  const skill = req.params.skill;
  console.log('Deleting skill from skill group');
  console.log('Group:                  ', group);
  console.log('Skill:                  ', skill);

  let requestedGroup;
  await SkillSet.findOne({ group: group })
    .then(result => {
      requestedGroup = result;
    })
    .catch(handleErrors);

  requestedGroup.skills = requestedGroup.skills.filter(e => e !== skill);

  await requestedGroup.save();

  const query = SkillSet.findOne({ group: group });
  await query.exec(function (err, someValue) {
    if (err) return next(err);
    res.send(someValue);
  });
};

exports.update = async (req, res, next) => {
  const escapeRegExp = require('lodash.escaperegexp');
  const group = req.params.group;
  const skill = escapeRegExp(req.params.skill);
  const newSkill = req.body.skill;
  console.log('Updating skill in skill group');
  console.log('Group:                  ', group);
  console.log('From:                   ', skill);
  console.log('To:                     ', newSkill);

  let requestedGroup;
  await SkillSet.findOne({ group: group })
    .then(result => {
      requestedGroup = result;
    })
    .catch(handleErrors);

  requestedGroup.skills = await requestedGroup.skills.map(x => x.replace(new RegExp(skill, 'g'), newSkill));
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
