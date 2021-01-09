require('dotenv').config();
const { API_BASE } = process.env;

const apiOptions = {
  // use for development
  server: 'http://localhost:2020'
};
if (process.env.NODE_ENV === 'production') {
  // use for deployed
  apiOptions.server = API_BASE;
}

const chartSvg = (chart) => {
  return `
<h2>Chart Template</h2>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
    <style>
        .axis {
            stroke-width: .2;
        }
        .scale {
            stroke-width: .2;
        }
        .shape {
            fill-opacity: .3;
        }
        .shape:hover {
            fill-opacity: .6;
        }
    </style>
    ${chart}
</svg>
`;
}

exports.chart = async (req, res) => {
  try {
    const fetch = require('node-fetch');
    let groups;
    await fetch(`${apiOptions.server}/api/v1/chartGroup`)
      .then(checkStatus)
      .then(res => res.json())
      .then(objData => groups = objData)
      .catch(handleErrors)

    let data;
    await fetch(`${apiOptions.server}/api/v1/chartData`)
      .then(checkStatus)
      .then(res => res.json())
      .then(objData => data = objData)
      .catch(handleErrors)
    console.log('Chart Groups: ', groups);
    console.log('Chart Data  : ', data);

    res.json(await getSvgChart(groups, data));
  } catch (error) {
    console.log(error);
    res.status(404).send({
      message: `could not get chart`,
    });
  }
}

exports.groups = async (req, res) => {
  try {
    const Result = await getGroups();
    res.json(Result);
  } catch (error) {
    console.log(error);
    res.status(404).send({
      message: `could not perform search for skill groups`,
    });
  }
}

exports.data = async (req, res) => {
  try {
    const Result = await getData();
    res.json(Result);
  } catch (error) {
    console.log(error);
    res.status(404).send({
      message: `could not perform search for skill data`,
    });
  }
}

async function getGroups () {
  // Placeholder data, to be replaced with db access
  return {
    // columns
    battery: 'Battery Capacity',
    design: 'Design',
    useful: 'Usefulness'
  }
}

async function getData () {
  // Placeholder data, to be replaced with db access
  return [
    // data
    { class: 'iphone', battery: .7, design: 1, useful: .9 },
    { class: 'galaxy', battery: 1, design: .6, useful: .8 },
    { class: 'nexus', battery: .8, design: .7, useful: .6 }
  ]
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
  const chart = radar(groups, data);

  // Convert the chart to an SVG representation
  const stringify = require('virtual-dom-stringify')
  const svgContent = chartSvg(stringify(chart));
  console.log('Chart SVG: ', svgContent);

  return svgContent;
}
