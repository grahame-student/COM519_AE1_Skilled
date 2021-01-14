const employeeList = (employees) => {
  const length = Math.min(10, employees.length);
  const listStart = `<select id="employee-selector" class="form-control" size="${length}" onchange="loadChart()">`;

  let listBody = '';
  employees.forEach(element => {
    listBody += `<option value="${element.email}">${element.name}</option>`;
  });

  const listEnd = '</select>';

  return listStart + listBody + listEnd;
};

// onLoad is used from a client side webpage
/* eslint-disable no-unused-vars */
async function onLoad () {
  /* eslint-enable no-unused-vars */
  await getEmployeeList();
  await loadDummyChart();
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

// loadDummyChary is called from a web page
/* eslint-disable no-unused-vars */
async function loadDummyChart () {
  /* eslint-enable no-unused-vars */
  const chartDomRef = document.querySelector('#skills-chart-container');
  try {
    console.log('requesting chart svg');
    const chartRef = await fetch('/api/v1/chart');
    const chart = await chartRef.json();

    const chartHtml = [];
    chartHtml.push(chart);
    chartDomRef.innerHTML = chartHtml.join('');
  } catch (e) {
    console.log(e);
    console.log('could not search api');
  }
}

// loadChart is called from a web page
/* eslint-disable no-unused-vars */
async function loadChart () {
  /* eslint-enable no-unused-vars */
  const selectedEmployee = document.getElementById('employee-selector').value;
  console.log('Job role selected: ', selectedEmployee);
  if (selectedEmployee === null) return;

  /* eslint-disable no-undef */
  // getParam becomes visible once deployed on the server
  const apiUrl = `/api/v1/chart/${getParam(selectedEmployee)}`;
  /* eslint-enable no-undef */

  const chartDomRef = document.querySelector('#skills-chart-container');
  try {
    console.log('requesting chart svg');
    const chartRef = await fetch(apiUrl);
    let chart;
    if (chartRef.status === 200) {
      chart = await chartRef.json();
    } else {
      chart = getNoAssessments();
    }
    const chartHtml = [];
    // TODO: Add a legend for the radar chart
    //       purple = actual level of skills
    //       green  = required level of skills
    chartHtml.push(chart);
    chartDomRef.innerHTML = chartHtml.join('');
  } catch (e) {
    console.log(`error using skilled API: ${apiUrl}`);
    console.log(e);
  }
}

const getNoAssessments = () => {
  return '<span class="h1">No assessments carried out yet</span>';
};
