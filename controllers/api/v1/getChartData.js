const opts = require('./apiOptions');

const chartSvg = (chart) => {
  return `
<svg id="skills-chart" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
    <style>
        .axis {
            stroke-width: 0.2;
        }
        .scale {
            stroke-width: 0.2;
        }
        .shape {
            fill-opacity: 0.3;
        }
        .shape:hover {
            fill-opacity: 0.6;
        }
        
        .shape.iphone {
            fill: #ff00ff;
        }
    </style>
    ${chart}
</svg>
`;
};

exports.chart = async (req, res) => {
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

    res.json(await getSvgChart(groups, data));
  } catch (error) {
    console.log(error);
    res.status(404).send({
      message: 'could not get chart'
    });
  }
};

exports.groups = async (req, res) => {
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

exports.data = async (req, res) => {
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
    battery: 'Battery Capacity',
    design: 'Design',
    useful: 'Usefulness'
  };
}

async function getData () {
  // Placeholder data, to be replaced with db access
  return [
    // data
    { class: 'iphone', battery: 0.7, design: 1, useful: 0.9 },
    { class: 'galaxy', battery: 1, design: 0.6, useful: 0.8 },
    { class: 'nexus', battery: 0.8, design: 0.7, useful: 0.6 }
  ];
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
  const chart = radar(groups, data, { shapeProps: (data) => ({ className: 'shape ' + data.class }) });

  // Convert the chart to an SVG representation
  const stringify = require('virtual-dom-stringify');
  return chartSvg(stringify(chart));
}
