const roleList = (roles) => {
  const listStart = `<label for="role-selector">Role</label>
    <select id="role-selector" class="form-control">`;

  let listBody = '';
  roles.forEach(element => {
    listBody += `<option value="${element.title}">${element.title}</option>`;
  });

  const listEnd = '</select>';

  return listStart + listBody + listEnd;
};

const employeeList = (employees) => {
  const listStart = `<label for="employee-selector">Employee</label>
    <select id="employee-selector" class="form-control">`;

  let listBody = '';
  employees.forEach(element => {
    listBody += `<option value="${element.email}">${element.name}</option>`;
  });

  const listEnd = '</select>';

  return listStart + listBody + listEnd;
};

// const skillList = (skills) => {
//   const reqSkills = skills['required skills'].skills;
//   console.log(reqSkills);
//
//   let listStart = '<div class="container">';
//   listStart += '<form id="skills-form" name="skills-form" method="post">';
//
//   let listBody = '';
//   let skillNo = 0;
//   reqSkills.forEach(group => {
//     group.skills.forEach(skill => {
//       listBody += skillControls(group.group, skill.skill, skill.level, skillNo);
//       skillNo++;
//     });
//   });
//
//   const listEnd = '</form></div>';
//
//   return listStart + listBody + listEnd;
// };

// const skillControls = (group, skill, level, skillNo) => {
//   let listStart = '<div class="input-group mb-1 overflow-auto">';
//   listStart += '<div class="input-group-prepend w-75">';
//
//   let listBody = `<span class="input-group-text w-100">${group} - ${skill}</span>`;
//   listBody += '</div>';
//   listBody += `<input type="number" class="form-control" name="requiredSkill[${skillNo}][level]" min="0" max="4" value="${level}" required>`;
//   listBody += `<input type="hidden" name="requiredSkill[${skillNo}][group]" value="${group}">`;
//   listBody += `<input type="hidden" name="requiredSkill[${skillNo}][skill]" value="${skill}">`;
//
//   const listEnd = '</div>';
//
//   return listStart + listBody + listEnd;
// };

// onLoad is used from a client side webpage
/* eslint-disable no-unused-vars */
async function onLoad () {
  /* eslint-enable no-unused-vars */
  await getRoleList();
  await getEmployeeList();
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

// getEmployeeList is used from a client side webpage
/* eslint-disable no-unused-vars */
async function getEmployeeList () {
  /* eslint-enable no-unused-vars */
  const apiUrl = '/api/v1/employees';

  const employeeDomRef = document.querySelector('#employee-list');
  try {
    console.log('requesting employee list');
    const employeeRef = await fetch(apiUrl);
    const employees = await employeeRef.json();

    const employeeHtml = [];
    employeeHtml.push(employeeList(employees));
    employeeDomRef.innerHTML = employeeHtml.join('');
  } catch (e) {
    console.log(`error using skilled API: ${apiUrl}`);
    console.log(e);
  }
}

// getRoleList is used from a client side webpage
/* eslint-disable no-unused-vars */
async function createAssessment () {
  /* eslint-enable no-unused-vars */
  const selectedRole = document.getElementById('role-selector').value;
  console.log('Job role selected: ', selectedRole);
  if (selectedRole === null) return;

  const selectedEmployee = document.getElementById('employee-selector').value;
  console.log('Employee selected: ', selectedEmployee);
  if (selectedEmployee === null) return;

  /* eslint-disable no-undef */
  // getParam becomes visible once deployed on the server
  const apiUrl = `/api/v1/assessment/${getParam(selectedEmployee)}`;
  /* eslint-enable no-undef */
  try {
    const assessment = await fetch(apiUrl, {
      method: 'PATCH',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ title: selectedRole })
    }).then((res) => {
      return res.json();
    });

    console.log(assessment);
  } catch (e) {
    console.log(`error using skilled API: ${apiUrl}`);
    console.log(e);
  }
}
