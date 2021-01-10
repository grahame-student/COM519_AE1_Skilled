const groupList = (groups) => {
  const length = Math.min(10, groups.length);

  const listStart = `<select id="group-selector" size="${length}" onchange="getSkillList()">`;

  let listBody = '';
  groups.forEach(element => {
    listBody += `<option value="${element.group}">${element.group}</option>`;
  });

  const listEnd = '</select>';

  return listStart + listBody + listEnd;
};

// getGroupList is used from a client side webpage
/* eslint-disable no-unused-vars */
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

// addGroup is used from a client side webpage
/* eslint-disable no-unused-vars */
async function addGroup () {
  /* eslint-enable no-unused-vars */
  const newGroup = prompt('Enter the name of the new skill group');
  if (newGroup === null) return;

  /* eslint-disable no-undef */
  // getParam becomes visible once deployed on the server
  const apiUrl = '/api/v1/group';
  /* eslint-enable no-undef */

  try {
    console.log(`adding group: ${newGroup}`);
    await fetch(apiUrl, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ group: newGroup })
    });

    await getGroupList();
  } catch (e) {
    console.log(e);
    console.log(`error using skilled API: ${apiUrl}`);
  }
}

// modifyGroup is used from a client side webpage
/* eslint-disable no-unused-vars */
async function modifyGroup () {
  /* eslint-enable no-unused-vars */
  const selectedSkill = document.getElementById('group-selector').value;
  console.log('Skill group selected: ', selectedSkill);

  const updatedGroup = prompt('Enter the new name of the new skill group', selectedSkill);
  if (updatedGroup === null) return;

  /* eslint-disable no-undef */
  // getParam becomes visible once deployed on the server
  const apiUrl = `/api/v1/group/${getParam(selectedSkill)}`;
  /* eslint-enable no-undef */

  try {
    console.log(`changing group: ${selectedSkill} to ${updatedGroup}`);
    await fetch(apiUrl, {
      method: 'PATCH',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ group: updatedGroup })
    });

    await getGroupList();
  } catch (e) {
    console.log(e);
    console.log(`error using skilled API: ${apiUrl}`);
  }
}

// deleteGroup is used from a client side webpage
/* eslint-disable no-unused-vars */
async function deleteGroup () {
  /* eslint-enable no-unused-vars */
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

// getSkillList is used from a client side webpage
/* eslint-disable no-unused-vars */
async function getSkillList () {
  /* eslint-enable no-unused-vars */
  const selectedSkill = document.getElementById('group-selector').value;
  console.log('Skill group selected: ', selectedSkill);

  /* eslint-disable no-undef */
  // getParam becomes visible once deployed on the server
  const apiUrl = `/api/v1/group/${getParam(selectedSkill)}`;
  /* eslint-enable no-undef */

  const skillsDomRef = document.querySelector('#skill-list');
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

// addSkill is used from a client side webpage
/* eslint-disable no-unused-vars */
async function addSkill () {
  /* eslint-enable no-unused-vars */

}

// modifySkill is used from a client side webpage
/* eslint-disable no-unused-vars */
async function modifySkill () {
  /* eslint-enable no-unused-vars */

}

// deleteSkill is used from a client side webpage
/* eslint-disable no-unused-vars */
async function deleteSkill () {
  /* eslint-enable no-unused-vars */

}
