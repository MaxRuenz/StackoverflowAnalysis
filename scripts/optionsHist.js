define([], function() {
  const optionsHist = {
    scales: {
      yAxes: [{
        type: 'logarithmic',
        ticks: {
          min: 1,
          padding: 20,
          fontColor: '#ffffff',
          callback: function (tick) {
            if( tick.toString().startsWith( '1' ))
              return tick.toLocaleString();
            return null;
          }
        },
        gridLines: {
          color: '#d3d3d3'
        },
        scaleLabel: {
          display: true,
          labelString: "Number of Users"
        }
      }],
      xAxes: [{
        gridLines: {
          color: '#ffffff',
          display: false
        },
        ticks: {
          fontColor: '#ffffff'
        },
        scaleLabel: {
          display: true,
          labelString: "Reputation"
        }
      }]
    },
    legend: false,
    tooltips: {
      callbacks: {
        label: function(t, d) {
          return d.datasets[t.datasetIndex].label + ': ' + t.yLabel;
        },
        title: function (t,d){
          return "Reputation: " + t[0].xLabel;
        }
     }
    }
  };


  return optionsHist
});
