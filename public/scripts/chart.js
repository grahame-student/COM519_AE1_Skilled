/* eslint-disable no-unused-vars */
async function loadChart () {
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
