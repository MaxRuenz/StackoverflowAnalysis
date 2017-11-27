'use strict';

$(function() {
  // Wait until HTML is loaded

  $('.carousel').carousel({
    interval: false,
    wrap: false
  });

  let ctx = document.getElementById("chart-descre");
  let myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: [1.00000000e+00, 3.60000000e+02, 7.19000000e+02,
        1.07800000e+03, 1.43700000e+03, 1.79600000e+03,
        2.15500000e+03, 2.51400000e+03, 2.87300000e+03,
        3.23200000e+03, 3.59100000e+03
      ],
      datasets: [{
        label: '# of Users',
        data: [4.17112000e+05, 7.70000000e+01, 1.20000000e+01,
          8.00000000e+00, 5.00000000e+00, 1.00000000e+00,
          1.00000000e+00, 1.00000000e+00, 0.00000000e+00,
          2.00000000e+00
        ],
        backgroundColor: [
          '#4292c6',
          '#4292c6',
          '#4292c6',
          '#4292c6',
          '#4292c6',
          '#4292c6',
          '#4292c6',
          '#4292c6',
          '#4292c6',
          '#4292c6'
        ]
      }]
    },
    options: {
      scales: {
        yAxes: [{
          type: 'logarithmic',
          ticks: {
            beginAtZero: true,
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
    }
  });

  let ctx2 = document.getElementById("chart-class");
  let myChart2 = new Chart(ctx2, {
    type: 'bar',
    data: {
      labels: [1.00000000e+00, 3.60000000e+02, 7.19000000e+02,
        1.07800000e+03, 1.43700000e+03, 1.79600000e+03,
        2.15500000e+03, 2.51400000e+03, 2.87300000e+03,
        3.23200000e+03, 3.59100000e+03
      ],
      datasets: [{
        label: '# of Users',
        data: [4.17112000e+05, 7.70000000e+01, 1.20000000e+01,
          8.00000000e+00, 5.00000000e+00, 1.00000000e+00,
          1.00000000e+00, 1.00000000e+00, 0.00000000e+00,
          2.00000000e+00
        ],
        backgroundColor: ['#eff3ff', '#bdd7e7', '#bdd7e7', '#6baed6', '#6baed6', '#3182bd', '#3182bd','#3182bd','#3182bd', '#08519c']
      }]
    },
    options: {
      scales: {
        yAxes: [{
          type: 'logarithmic',
          ticks: {
            beginAtZero: true,
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
    }
  });

  let ctx3 = document.getElementById("chart-contrib");
  let myChart3 = new Chart(ctx3, {
    type: 'doughnut',
    data: {
      labels:[   "One time users",
        "Occasinal users",
        "Common users",
        "Frequent users",
        "Super users"
      ],
      datasets: [{
        label: "",
        data: [ 0, 10, 20, 30, 40
        ],
        backgroundColor: ['#eff3ff', '#bdd7e7', '#6baed6','#3182bd', '#08519c']
      }]
    },
    options: {
      legend: {
        position: 'bottom'
      }
    }
  });

  let ctx4 = document.getElementById("chart-evol");
  let myChart4 = new Chart(ctx4, {
    type: 'line',
    data: {
      labels:[ 1,2,3,4, 5
      ],
      datasets: [{
        label: "common users",
        fill: false,
        data: [ 0, 10, 20, 30, 40
        ],
        backgroundColor: '#6baed6',
        borderColor: '#6baed6'
      },
      {
        label: "super users",
        fill: false,
        data: [ 0, 20, 40, 80, 160
        ],
        bordergroundColor: '#08519c',
        borderColor: '#08519c'
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true,
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
    }
  });

  $('#slider').slider({
    formatter: function(value) {
      return 'Current value: ' + value;
    }
  });
  $("#slider").on("slide", function(slideEvt) {
    $("#vote-current").text(slideEvt.value);
  });
});
