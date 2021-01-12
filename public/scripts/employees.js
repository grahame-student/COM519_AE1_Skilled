const employeeList = (employees) => {
  const length = Math.min(10, employees.length);

  const listStart = `<select id="employee-selector" size="${length}" onchange="getEmployeeDetails()">`;

  let listBody = '';
  employees.forEach(element => {
    listBody += `<option value="${element.email}">${element.name}</option>`;
  });

  const listEnd = '</select>';

  return listStart + listBody + listEnd;
};

const detailsList = (details) => {
  let listStart = '<div class="container">';
  listStart += '<form id="details-form" name="details-form" method="post">';

  const listBody = '' +
    '<div class="input-group mb-1 overflow-auto">' +
    '  <div class="input-group-prepend w-25">' +
    '    <span class="input-group-text w-100">Name</span>' +
    '  </div>' +
    `  <input type="text" class="form-control" name="employee-name" value="${details.name}" required>` +
    '</div>' +
    '<div class="input-group mb-1 overflow-auto">' +
    '  <div class="input-group-prepend w-25">' +
    '    <span class="input-group-text w-100">Email</span>' +
    '  </div>' +
    `  <input type="email" class="form-control" name="employee-email" value="${details.email}" required>` +
    '</div>' +
    '<div class="input-group mb-1 overflow-auto">' +
    '  <div class="input-group-prepend w-25">' +
    '    <span class="input-group-text w-100">Job Title</span>' +
    '  </div>' +
    `  <input type="text" class="form-control" name="employee-title" value="${details['job title']}" required>` +
    '</div>';

  const listEnd = '</form></div>';

  return listStart + listBody + listEnd;
};

// onLoad is used from a client side webpage
/* eslint-disable no-unused-vars */
async function onLoad () {
  /* eslint-enable no-unused-vars */
  await getEmployeeList();
}

// getRoleList is used from a client side webpage
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

// getEmployeeDetails is used from a client side webpage
/* eslint-disable no-unused-vars */
async function getEmployeeDetails () {
  /* eslint-enable no-unused-vars */
  const selectedEmployee = document.getElementById('employee-selector').value;
  console.log('Job role selected: ', selectedEmployee);
  if (selectedEmployee === null) return;

  /* eslint-disable no-undef */
  // getParam becomes visible once deployed on the server
  const apiUrl = `/api/v1/employee/${getParam(selectedEmployee)}`;
  /* eslint-enable no-undef */

  const detailsDomRef = document.querySelector('#employee-details');
  try {
    console.log('requesting employee details');
    const detailsRef = await fetch(apiUrl);
    const details = await detailsRef.json();
    console.log(details);

    const detailsHtml = [];
    detailsHtml.push(detailsList(details));
    detailsDomRef.innerHTML = detailsHtml.join('');
  } catch (e) {
    console.log(`error using skilled API: ${apiUrl}`);
    console.log(e);
  }
}

// saveEmployee is used from a client side webpage
/* eslint-disable no-unused-vars */
async function saveEmployee () {
  /* eslint-enable no-unused-vars */
}

// addEmployee is used from a client side webpage
/* eslint-disable no-unused-vars */
async function addEmployee () {
  /* eslint-enable no-unused-vars */
}

// deleteEmployee is used from a client side webpage
/* eslint-disable no-unused-vars */
async function deleteEmployee () {
  /* eslint-enable no-unused-vars */
}
