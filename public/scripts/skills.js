const groupList = (groups) => {
  const length = Math.min(10, groups.length);

  const listStart = `<select id="group-selector" size="${length}" onchange="getSkillList()">`;

  let listBody = '';
  groups.forEach(element => {
    listBody += `<option value="${element.group}">${element.group}</option>`;
  });

  const listEnd = '</select>';

  console.log(listStart + listBody + listEnd);
  return listStart + listBody + listEnd;
};

/* eslint-disable no-unused-vars */

// getGroupList is used from a client side webpage
async function getGroupList () {
  /* eslint-enable no-unused-vars */

  const apiUrl = '/api/v1/group';

  const groupDomRef = document.querySelector('#group-list');
  try {
    console.log('requesting group list');
    const groupRef = await fetch(apiUrl);
    const groups = await groupRef.json();

    const groupHtml = [];
    groupHtml.push(groupList(groups));
    groupDomRef.innerHTML = groupHtml.join('');
  } catch (e) {
    console.log(`error using skilled API: ${apiUrl}`);
    console.log(e);
  }
}

/* eslint-disable no-unused-vars */

// getSkillList is used from a client side webpage
async function getSkillList () {
  /* eslint-enable no-unused-vars */
  const selectedSkill = document.getElementById('group-selector').value;
  console.log('Skill group selected: ', selectedSkill);

  /* eslint-disable no-undef */
  // getParam becomes visible once deployed on the server
  const apiUrl = `/api/v1/group/${getParam(selectedSkill)}`;
  /* eslint-enable no-undef */

  const skillsDomRef = document.querySelector('#skill-aspects');
  try {
    console.log('requesting group using: ', apiUrl);
    const skillsRef = await fetch(apiUrl);
    const group = await skillsRef.json();

    const skillsHtml = [];
    skillsHtml.push(group.skills.toString());
    skillsDomRef.innerHTML = skillsHtml.join('');
  } catch (e) {
    console.log(`error using skilled API: ${apiUrl}`);
    console.log(e);
  }
}

async function addGroup () {

}

async function modifyGroup () {
  const selectedSkill = document.getElementById('group-selector').value;
  console.log('Skill group selected: ', selectedSkill);

  /* eslint-disable no-undef */
  // getParam becomes visible once deployed on the server
  const apiUrl = `/api/v1/group/${getParam(selectedSkill)}`;
  /* eslint-enable no-undef */
}

async function deleteGroup () {
  const selectedGroup = document.getElementById('group-selector').value;
  console.log('Skill group selected: ', selectedGroup);

  /* eslint-disable no-undef */
  // getParam becomes visible once deployed on the server
  const apiUrl = `/api/v1/group/${getParam(selectedGroup)}`;
  /* eslint-enable no-undef */

  try {
    console.log(`deleting group: ${selectedGroup}`);
    await fetch(apiUrl, { method: 'DELETE' });

    await getGroupList();
  } catch (e) {
    console.log(e);
    console.log(`error using skilled API: ${apiUrl}`);
  }
}

async function addSkill () {

}

async function modifySkill () {

}

async function deleteSkill () {

}
