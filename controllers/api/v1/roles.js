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
    .sort({ 'required skills.dateDefined': -1 });

  res.send(result[0]);
};

exports.delete = async (req, res, next) => {
  const title = req.params.title;
  console.log('Deleting role');
  console.log('Title:                  ', title);

  const query = Role.findOneAndDelete({ title: title });
  query.exec(function (err, someValue) {
    if (err) return next(err);
    res.send(someValue);
  });
};

exports.update = async (req, res, next) => {
  const oldRole = req.params.title;
  const newRole = req.body.title;
  console.log('Updating job role group');
  console.log('From:                   ', oldRole);
  console.log('To:                     ', newRole);

  let requestedRole;
  await Role.findOne({ title: oldRole })
    .then(result => {
      requestedRole = result;
    })
    .catch(handleErrors);

  requestedRole.title = newRole;
  await requestedRole.save();

  const query = Role.findOne({ title: newRole });
  await query.exec(function (err, someValue) {
    if (err) return next(err);
    res.send(someValue);
  });
};

exports.add = async (req, res, next) => {
  const title = req.params.title;
  console.log('Adding new role');
  console.log('Title::                 ', title);

  // Create new role
  const role = new Role({ title: title });

  // Get the list of skill groups
  const opts = require('./apiOptions');
  const fetch = require('node-fetch');
  const baseUrl = await opts.apiurl();
  let groups;
  console.log(`Getting group list using endpoint: ${baseUrl}/api/v1/group`);
  await fetch(`${baseUrl}/api/v1/groups`)
    .then(checkStatus)
    .then(res => res.json())
    .then(objData => {
      groups = objData;
    })
    .catch(handleErrors);

  role['required skills'].push({});
  groups.forEach(group => {
    const skillList = [];
    group.skills.forEach(skill => {
      skillList.push({ skill: skill, level: 0 });
    });
    const skillGroup = { group: group.group, skills: skillList };
    role['required skills'][0].skills.push(skillGroup);
  });
  await role.save();

  const query = Role.findOne({ title: title });
  await query.exec(function (err, someValue) {
    if (err) return next(err);
    res.send(someValue);
  });
};

async function checkStatus (res) {
  if (res.ok) {
    // res.status >= 200 && res.status < 300
    return res;
  } else {
    console.log('Unable to obtain valid result');
  }
}

async function handleErrors (error) {
  console.log(error);
}
