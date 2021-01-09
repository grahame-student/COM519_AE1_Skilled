const loadChart = async () => {
  const chartDomRef = document.querySelector('#skills-chart');
  try {
    console.log('requesting chart svg');
    const chartRef = await fetch('/api/v1/chart');
    const chart = await chartRef.json();

    let chartHtml = [];
    chartHtml.push(chart);
    chartDomRef.innerHTML = chartHtml.join('');
  } catch (e) {
    console.log(e);
    console.log('could not search api');
  }
}