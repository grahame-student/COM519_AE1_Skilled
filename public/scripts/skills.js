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
  const groupDomRef = document.querySelector('#group-list');
  try {
    console.log('requesting group list');
    const groupRef = await fetch('/api/v1/group');
    const groups = await groupRef.json();

    const groupHtml = [];
    groupHtml.push(groupList(groups));
    groupDomRef.innerHTML = groupHtml.join('');
  } catch (e) {
    console.log(e);
    console.log('could not search api');
  }
}

/* eslint-disable no-unused-vars */
// getSkillList is used from a client side webpage
async function getSkillList () {
  /* eslint-enable no-unused-vars */
  const selectedSkill = document.getElementById('group-selector').value;
  console.log('Skill group selected: ', selectedSkill);

  const skillsDomRef = document.querySelector('#skill-aspects');
  try {
    /* eslint-disable no-undef */
    // getParam becomes visible once deployed on the server
    const apiUrl = `/api/v1/group/${getParam(selectedSkill)}`;
    /* eslint-enable no-undef */

    console.log('requesting group using: ', apiUrl);
    const skillsRef = await fetch(apiUrl);
    const group = await skillsRef.json();

    const skillsHtml = [];
    skillsHtml.push(group.skills.toString());
    skillsDomRef.innerHTML = skillsHtml.join('');
  } catch (e) {
    console.log(e);
    console.log('could not search api');
  }
}
