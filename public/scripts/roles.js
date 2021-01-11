const roleList = (roles) => {
  const length = Math.min(10, roles.length);

  const listStart = `<select id="role-selector" size="${length}" onchange="getSkillList()">`;

  let listBody = '';
  roles.forEach(element => {
    listBody += `<option value="${element.title}">${element.title}</option>`;
  });

  const listEnd = '</select>';

  return listStart + listBody + listEnd;
};

const skillList = (skills) => {
  const reqSkills = skills['required skills'].skills;
  console.log(reqSkills);

  let listStart = '<div class="container">';
  listStart += '<form id="skills-form" name="skills-form" method="post">';

  let listBody = '';
  let skillNo = 0;
  reqSkills.forEach(group => {
    group.skills.forEach(skill => {
      listBody += skillControls(group.group, skill.skill, skill.level, skillNo);
      skillNo++;
    });
  });

  const listEnd = '</form></div>';

  return listStart + listBody + listEnd;
};

const skillControls = (group, skill, level, skillNo) => {
  let listStart = '<div class="input-group mb-1 overflow-auto">';
  listStart += '<div class="input-group-prepend w-75">';

  let listBody = `<span class="input-group-text w-100">${group} - ${skill}</span>`;
  listBody += '</div>';
  listBody += `<input type="number" class="form-control" name="requiredSkill[${skillNo}][level]" min="0" max="4" value="${level}" required>`;
  listBody += `<input type="hidden" name="requiredSkill[${skillNo}][group]" value="${group}">`;
  listBody += `<input type="hidden" name="requiredSkill[${skillNo}][skill]" value="${skill}">`;

  const listEnd = '</div>';

  return listStart + listBody + listEnd;
};

// onLoad is used from a client side webpage
/* eslint-disable no-unused-vars */
async function onLoad () {
  /* eslint-enable no-unused-vars */
  await getRoleList();

  const sel = document.getElementById('role-selector');
  if (sel != null && sel.length > 0) {
    sel.selectedIndex = 0;
  }

  await getSkillList();
}

// getRoleList is used from a client side webpage
/* eslint-disable no-unused-vars */
async function getRoleList () {
  /* eslint-enable no-unused-vars */
  const apiUrl = '/api/v1/role';

  const roleDomRef = document.querySelector('#role-list');
  try {
    console.log('requesting roles list');
    const roleRef = await fetch(apiUrl);
    const roles = await roleRef.json();

    const roleHtml = [];
    roleHtml.push(roleList(roles));
    roleDomRef.innerHTML = roleHtml.join('');
  } catch (e) {
    console.log(`error using skilled API: ${apiUrl}`);
    console.log(e);
  }
}

// getSkillList is used from a client side webpage
/* eslint-disable no-unused-vars */
async function getSkillList () {
  /* eslint-enable no-unused-vars */
  const selectedRole = document.getElementById('role-selector').value;
  console.log('Job role selected: ', selectedRole);
  if (selectedRole === null) return;

  /* eslint-disable no-undef */
  // getParam becomes visible once deployed on the server
  const apiUrl = `/api/v1/role/${getParam(selectedRole)}/skill`;
  /* eslint-enable no-undef */

  const skillDomRef = document.querySelector('#skill-list');
  try {
    console.log('requesting required skills');
    const skillRef = await fetch(apiUrl);
    const skills = await skillRef.json();
    console.log(skills);

    const skillHtml = [];
    skillHtml.push(skillList(skills));
    skillDomRef.innerHTML = skillHtml.join('');
  } catch (e) {
    console.log(`error using skilled API: ${apiUrl}`);
    console.log(e);
  }
}

// getSkillList is used from a client side webpage
/* eslint-disable no-unused-vars */
async function saveRole () {
  /* eslint-enable no-unused-vars */
  const selectedRole = document.getElementById('role-selector').value;
  console.log('Job role selected: ', selectedRole);
  if (selectedRole === null) return;

  const formElement = document.getElementById('skills-form');
  const formData = new FormData(formElement);

  /* eslint-disable no-undef */
  // getParam becomes visible once deployed on the server
  const apiUrl = `/api/v1/requiredSkills/${getParam(selectedRole)}`;
  /* eslint-enable no-undef */

  try {
    console.log(`saving new role values for: ${selectedRole}`);
    await fetch(apiUrl, {
      method: 'PATCH',
      body: formData
    });
  } catch (e) {
    console.log(`error using skilled API: ${apiUrl}`);
    console.log(e);
  }

  // TODO: Needs completing
}

// getSkillList is used from a client side webpage
/* eslint-disable no-unused-vars */
async function addRole () {
  /* eslint-enable no-unused-vars */
  const newRole = prompt('Enter the name of the new job role');
  if (newRole === null) return;

  /* eslint-disable no-undef */
  // getParam becomes visible once deployed on the server
  const apiUrl = `/api/v1/role/${getParam(newRole)}`;
  /* eslint-enable no-undef */

  try {
    console.log(`creating new role: ${newRole}`);
    await fetch(apiUrl, {
      method: 'POST',
    });
  } catch (e) {
    console.log(`error using skilled API: ${apiUrl}`);
    console.log(e);
  }

  await getRoleList();
}

// getSkillList is used from a client side webpage
/* eslint-disable no-unused-vars */
async function modifyRole () {
  /* eslint-enable no-unused-vars */
}

// getSkillList is used from a client side webpage
/* eslint-disable no-unused-vars */
async function deleteRole () {
  /* eslint-enable no-unused-vars */
  const selectedRole = document.getElementById('role-selector').value;
  console.log('Job role selected: ', selectedRole);
  if (selectedRole === null) return;

  /* eslint-disable no-undef */
  // getParam becomes visible once deployed on the server
  const apiUrl = `/api/v1/role/${getParam(selectedRole)}`;
  /* eslint-enable no-undef */

  try {
    console.log(`deleting role: ${selectedRole}`);
    await fetch(apiUrl, { method: 'DELETE' });

    await getRoleList();
    await getSkillList();
  } catch (e) {
    console.log(e);
    console.log(`error using skilled API: ${apiUrl}`);
  }
}
