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
  const length = Math.min(10, skills.length);

  const listStart = `<select id="skill-selector" size="${length}">`;

  let listBody = '';
  skills.forEach(element => {
    listBody += `<option value="${element}">${element}</option>`;
  });

  const listEnd = '</select>';

  console.log(listStart + listBody + listEnd);
  return listStart + listBody + listEnd;
};

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
    const roleRef = await fetch(apiUrl);
    const roles = await roleRef.json();
    console.log(roles);

    // const skillHtml = [];
    // skillHtml.push(roleList(roles));
    // skillDomRef.innerHTML = roleHtml.join('');
  } catch (e) {
    console.log(`error using skilled API: ${apiUrl}`);
    console.log(e);
  }
}
