const opts = require('./apiOptions');
const smoothing = require('svg-radar-chart/smoothing');

const chartSvg = (chart) => {
  return `
<svg id="skills-chart" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
    <style>
        .axis {
            stroke: #555;
            stroke-width: 0.2;
        }
        .scale {
            stroke: #999;
            stroke-width: 0.2;
        }
        .shape {
            fill-opacity: 0.3;
        }
        .shape:hover {
            fill-opacity: 0.6;
        }
        
        .shape.required {
            fill: #008800;
        }
        .shape.required:hover {
            fill: #008800;
        }
        .shape.actual {
            fill: #880088;
        }
    </style>
    ${chart}
</svg>
`;
};

exports.chart = async (req, res) => {
  const email = req.params.email;

  try {
    const fetch = require('node-fetch');
    const baseUrl = await opts.apiurl();

    let apiUrl = `${baseUrl}/api/v1/employee/${getParam(email)}`;
    console.log(`Getting employee using endpoint: ${apiUrl}`);
    let employee;
    await fetch(apiUrl)
      .then(checkStatus)
      .then(res => res.json())
      .then(objData => {
        employee = objData;
      })
      .catch(handleErrors);

    if (employee.assessments.length > 0) {
      apiUrl = `${baseUrl}/api/v1/employee/${getParam(email)}/assessment`;
      console.log(`Getting latest employee assessment using endpoint: ${apiUrl}`);
      let assessment;
      await fetch(apiUrl)
        .then(checkStatus)
        .then(res => res.json())
        .then(objData => {
          assessment = objData;
        })
        .catch(handleErrors);

      const groups = await getChartGroups(assessment);
      const data = await getChartData(assessment);
      const chart = await getSvgChart(groups, data);
      res.json(chart);
    } else {
      console.log('Employee has no assessments');
      res.status(404).send({
        message: 'could not get chart'
      });
    }
  } catch (error) {
    console.log(error);
    res.status(404).send({
      message: 'could not get chart'
    });
  }
};

exports.dummyChart = async (req, res) => {
  try {
    const fetch = require('node-fetch');
    const baseUrl = await opts.apiurl();
    let groups;
    console.log(`Getting group list using endpoint: ${baseUrl}/api/v1/chartGroup`);
    await fetch(`${baseUrl}/api/v1/chartGroup`)
      .then(checkStatus)
      .then(res => res.json())
      .then(objData => {
        groups = objData;
      })
      .catch(handleErrors);

    let data;
    console.log(`Getting chart data using endpoint: ${baseUrl}/api/v1/chartData`);
    await fetch(`${baseUrl}/api/v1/chartData`)
      .then(checkStatus)
      .then(res => res.json())
      .then(objData => {
        data = objData;
      })
      .catch(handleErrors);

    const chart = await getSvgChart(groups, data);
    res.json(chart);
  } catch (error) {
    console.log(error);
    res.status(404).send({
      message: 'could not get chart'
    });
  }
};

exports.dummyGroups = async (req, res) => {
  try {
    const Result = await getGroups();
    res.json(Result);
  } catch (error) {
    console.log(error);
    res.status(404).send({
      message: 'could not perform search for skill groups'
    });
  }
};

exports.dummyData = async (req, res) => {
  try {
    const Result = await getData();
    res.json(Result);
  } catch (error) {
    console.log(error);
    res.status(404).send({
      message: 'could not perform search for skill data'
    });
  }
};

async function getGroups () {
  // Placeholder data, to be replaced with db access
  return {
    // columns
    skillGroup1: 'Software',
    skillGroup2: 'Hardware',
    skillGroup3: 'Verification'
  };
}

async function getData () {
  // Placeholder data, to be replaced with db access
  return [
    // data
    { class: 'required', skillGroup1: 2 / 4, skillGroup2: 2 / 4, skillGroup3: 2 / 4 },
    { class: 'actual', skillGroup1: 2.9 / 4, skillGroup2: 0.6 / 4, skillGroup3: 3 / 4 }
  ];
}

async function getChartGroups (assessment) {
  const groups = {};
  assessment.assessments.skills.forEach(group => {
    group.skills.forEach(skill => {
      groups[skill.skill] = skill.skill;
    });
  });
  return groups;
}

async function getChartData (assessment) {
  const data = [];
  data.push({ class: 'required' });
  data.push({ class: 'actual' });
  assessment.assessments.skills.forEach(group => {
    group.skills.forEach(skill => {
      data[0][skill.skill] = skill['required level'] / 4;
      data[1][skill.skill] = skill['actual level'] / 4;
    });
  });
  return data;
}

async function checkStatus (res) {
  if (res.ok) {
    // res.status >= 200 && res.status < 300
    return res;
  } else {
    console.log('Unable to obtain valid result');
  }
}

async function handleErrors (error) {
  console.log(error);
}

async function getSvgChart (groups, data) {
  // Generate the chart from the gathered elements
  const radar = require('svg-radar-chart');
  const opts = {
    axes: true,
    scales: 4,
    captions: true,
    size: 100,
    smoothing: smoothing(0.5),
    shapeProps: (data) => ({ className: 'shape ' + data.class })
  };

  const chart = radar(groups, data, opts);

  // Convert the chart to an SVG representation
  const stringify = require('virtual-dom-stringify');
  return chartSvg(stringify(chart));
}

/* eslint-disable no-unused-vars */
function getParam (param) {
  /* eslint-enable no-unused-vars */
  const esc = encodeURIComponent;
  return esc(param);
}
