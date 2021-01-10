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
  const length = Math.min(10, reqSkills.length);

  const listStart = `<div class="container">`;

  let listBody = '';
  reqSkills.forEach(group => {
    group.skills.forEach(skill => {
      listBody += skillControls(group.group, skill.skill, skill.level)
    })
  });

  const listEnd = '</div>';

  console.log(listStart + listBody + listEnd);
  return listStart + listBody + listEnd;
};

const skillControls = (group, skill, level) => {

  // <div class="input-group mb-3">
  //   <div classe="input-group-prepend">
  //     <span class="input-group-text" id="basic-addon1">@</span>
  //   </div>
  //   <input type="text" class="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1">
  // </div>

  let listStart = `<div class="input-group mb-3 overflow-auto">`;
  listStart += `<div class="input-group-prepend w-75">`;

  let listBody = `<span class="input-group-text w-100">${group} - ${skill}</span>`;
  listBody += `</div>`;
  listBody += `<input type="number" class="form-control" name="required[${group}][${skill}]" min="0" max="4" value="${level}" required>`;

  const listEnd = '</div>';
  console.log(listStart + listBody + listEnd);

  return listStart + listBody + listEnd;
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

// getRoleList is used from a client side webpage
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
