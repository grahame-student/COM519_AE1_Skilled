const Role = require('../../../models/Role');

exports.add = async (req, res, next) => {
  const title = req.params.title;

  // HACK: I think I'm doing something wrong somewhere as req.body logs as a null prototype object
  //       round-tripping using JSON causes the logging to appear as expected
  const requiredSkill = JSON.parse(JSON.stringify(req.body)).requiredSkill;
  console.log('Saving Role Requirements');
  console.log('Title:                  ', title);
  console.log('Required Skills:        ', requiredSkill);

  let requestedRole;
  await Role.findOne({ title: title })
    .then(result => {
      requestedRole = result;
    })
    .catch(handleErrors);

  // { group: '', skill: '', level: 0 }
  const groups = [];
  requiredSkill.forEach(skill => {
    const inGroups = groups[skill.group] != null;
    if (!inGroups) {
      groups[skill.group] = [{ skill: skill.skill, level: skill.level }];
    } else {
      groups[skill.group].push({ skill: skill.skill, level: skill.level });
    }
  });

  requestedRole['required skills'].push({});
  Object.keys(groups).forEach((group) => {
    const skillList = [];
    groups[group].forEach(skill => {
      skillList.push({ skill: skill.skill, level: skill.level });
    });
    const skillGroup = { group: group, skills: skillList };
    const lastElement = requestedRole['required skills'].length - 1;
    requestedRole['required skills'][lastElement].skills.push(skillGroup);
  });
  await requestedRole.save();

  const query = Role.findOne({ title: title });
  await query.exec(function (err, someValue) {
    if (err) return next(err);
    res.send(someValue);
  });
};

async function handleErrors (error) {
  console.log(error);
}
