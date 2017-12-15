define([], function() {
  const optionsHist = {
    scales: {
      yAxes: [{
        type: 'logarithmic',
        ticks: {
          min: 1,
          padding: 20,
          fontColor: '#ffffff'
        },
        gridLines: {
          color: '#d3d3d3'
        },
        scaleLabel: {}
      }],
      xAxes: [{
        gridLines: {
          color: '#ffffff',
          display: false
        },
        ticks: {
          fontColor: '#ffffff'
        }
      }]
    },
    legend: {
      position: 'bottom'
    }
  };


  return optionsHist
});
