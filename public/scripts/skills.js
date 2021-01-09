const groupList = (groups) => {
  const length = Math.min(10, groups.length);

  const list_start = `<select id="group-selector" size="${length}" onchange="getSkillList()">`;

  let list_body = ``;
  groups.forEach(element => {
    list_body += `<option value="${element.group}">${element.group}</option>`
  });

  const list_end = `</select>`;

  console.log(list_start + list_body + list_end);
  return list_start + list_body + list_end;
};

/* eslint-disable no-unused-vars */
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

async function getSkillList () {
  const selectedSkill = document.getElementById("group-selector").value;
  console.log('Skill group selected: ', selectedSkill);

  const skillsDomRef = document.querySelector('#skill-aspects');
  try {
    console.log('requesting group using: ', '/api/v1/group/' + getParam(selectedSkill));
    const skillsRef = await fetch('/api/v1/group/' + getParam(selectedSkill));
    const group = await skillsRef.json();

    const skillsHtml = [];
    skillsHtml.push(group.skills.toString());
    skillsDomRef.innerHTML = skillsHtml.join('');
  } catch (e) {
    console.log(e);
    console.log('could not search api');
  }
}
