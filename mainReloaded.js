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
        backgroundColor: ['#eff3ff', '#bdd7e7', '#bdd7e7', '#6baed6', '#6baed6', '#3182bd', '#3182bd', '#3182bd', '#3182bd', '#08519c']
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
      labels: ["One time users",
        "Occasinal users",
        "Common users",
        "Frequent users",
        "Super users"
      ],
      datasets: [{
        label: "",
        data: [1, 2, 4, 8, 16],
        backgroundColor: ['#eff3ff', '#bdd7e7', '#6baed6', '#3182bd', '#08519c']
      }]
    },
    options: {
      legend: {
        position: 'bottom'
      }
    }
  });

  // stream Chart

  var n = 20, // number of layers
    m = 200, // number of samples per layer
    k = 10; // number of bumps per layer

  var stack = d3.stack().keys(d3.range(n)).offset(d3.stackOffsetWiggle),
    layers0 = stack(d3.transpose(d3.range(n).map(function() {
      return bumps(m, k);
    }))),
    layers1 = stack(d3.transpose(d3.range(n).map(function() {
      return bumps(m, k);
    }))),
    layers = layers0.concat(layers1);

  var svg = d3.select("#div-stream").append("svg").attr('width', 1200).attr('height', 400),
    width = 1200,
    height = 400;

  var x = d3.scaleLinear()
    .domain([0, m - 1])
    .range([0, width]);

  var y = d3.scaleLinear()
    .domain([d3.min(layers, stackMin), d3.max(layers, stackMax)])
    .range([height, 0]);

  var z = d3.interpolateCool;

  var area = d3.area()
    .x(function(d, i) {
      return x(i);
    })
    .y0(function(d) {
      return y(d[0]);
    })
    .y1(function(d) {
      return y(d[1]);
    });

  svg.selectAll("path")
    .data(layers0)
    .enter().append("path")
    .attr("d", area)
    .attr("fill", function() {
      return z(Math.random());
    });

  function stackMax(layer) {
    return d3.max(layer, function(d) {
      return d[1];
    });
  }

  function stackMin(layer) {
    return d3.min(layer, function(d) {
      return d[0];
    });
  }

  function transition() {
    var t;
    d3.selectAll("path")
      .data((t = layers1, layers1 = layers0, layers0 = t))
      .transition()
      .duration(2500)
      .attr("d", area);
  }

  // Inspired by Lee Byron’s test data generator.
  function bumps(n, m) {
    var a = [],
      i;
    for (i = 0; i < n; ++i) a[i] = 0;
    for (i = 0; i < m; ++i) bump(a, n);
    return a;
  }

  function bump(a, n) {
    var x = 1 / (0.1 + Math.random()),
      y = 2 * Math.random() - 0.5,
      z = 10 / (0.1 + Math.random());
    for (var i = 0; i < n; i++) {
      var w = (i / n - y) * z;
      a[i] += x * Math.exp(-w * w);
    }
  }

  // parallel cordinates

  var margin = {
      top: 30,
      right: 10,
      bottom: 10,
      left: 10
    },
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

  var x = d3.scalePoint().range([0, width], 1),
    y = {},
    dragging = {};

  var line = d3.line(),
    axis = d3.axisLeft(),
    background,
    foreground,
    dimensions;

  var svg = d3.select("#div-cordinates").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  d3.csv("cars.csv", function(error, cars) {

    // Extract the list of dimensions and create a scale for each.
    x.domain(dimensions = d3.keys(cars[0]).filter(function(d) {
      return d != "name" && (y[d] = d3.scaleLinear()
        .domain(d3.extent(cars, function(p) {
          return +p[d];
        }))
        .range([height, 0]));
    }));

    console.log(dimensions);
    let valRanges = dimensions.map(function(d) {
      return d3.extent(cars, function(p) {
        return +p[d];
      })
    });
    let valRangesObj = {};
    for (let i = 0; i < dimensions.length; i++) {
      valRangesObj[dimensions[i]] = valRanges[i];
    }
    console.log(valRangesObj);

    // Add grey background lines for context.
    background = svg.append("g")
      .attr("class", "background")
      .selectAll("path")
      .data(cars)
      .enter().append("path")
      .attr("d", path);

    // Add blue foreground lines for focus.
    foreground = svg.append("g")
      .attr("class", "foreground")
      .selectAll("path")
      .data(cars)
      .enter().append("path")
      .attr("d", path);

    // Add a group element for each dimension.
    var g = svg.selectAll(".dimension")
      .data(dimensions)
      .enter().append("g")
      .attr("class", "dimension")
      .attr("class", "brush")
      .attr("transform", function(d) {
        return "translate(" + x(d) + ")";
      })
      .call(d3.drag()
        .subject(function(d) {
          return {
            x: x(d)
          };
        })
        .on("start", function(d) {
          dragging[d] = x(d);
          background.attr("visibility", "hidden");
        })
        .on("drag", function(d) {
          dragging[d] = Math.min(width, Math.max(0, d3.event.x));
          foreground.attr("d", path);
          dimensions.sort(function(a, b) {
            return position(a) - position(b);
          });
          x.domain(dimensions);
          g.attr("transform", function(d) {
            return "translate(" + position(d) + ")";
          })
        })
        .on("end", function(d) {
          delete dragging[d];
          transition(d3.select(this)).attr("transform", "translate(" + x(d) + ")");
          transition(foreground).attr("d", path);
          background
            .attr("d", path)
            .transition()
            .delay(500)
            .duration(0)
            .attr("visibility", null);
        }));

    // Add an axis and title.
    g.append("g")
      .attr("class", "axis")
      .each(function(d) {
        d3.select(this).call(axis.scale(y[d]));
      })
      .append("text")
      .style("text-anchor", "middle")
      .attr("y", -9)
      .text(function(d) {
        return d;
      });

    // Add and store a brush for each axis.
    g.append("g")
      .attr("class", "brush")
      .each(function(d) {
        d3.select(this).call(y[d].brush = d3.brushY(y[d])
                          .extent([[-8,0], [8,height]])
                          .on("start", brushstart)
                          .on("brush", brush));
      })
      .selectAll("rect")
      .attr("x", -8)
      .attr("width", 16);



    function position(d) {
      var v = dragging[d];
      return v == null ? x(d) : v;
    }

    function transition(g) {
      return g.transition().duration(500);
    }

    // Returns the path for a given data point.
    function path(d) {
      return line(dimensions.map(function(p) {
        return [position(p), y[p](d[p])];
      }));
    }

    function brushstart() {
      d3.event.sourceEvent.stopPropagation();
    }

    // Handles a brush event, toggling the display of foreground lines.
    function brush() {

      var actives = [];
      svg.selectAll(".brush")
        .filter(function(d) {
          return d3.brushSelection(this);
        })
        .each(function(d) {
          actives.push({
            dimension: d,
            extent: d3.brushSelection(this)
          });
        });

      foreground.style("display", function(d) {
        return actives.every(function(p) {
          let scaled = d3.scaleLinear().domain(valRangesObj[p.dimension]).range([height, 0])(d[p.dimension]);
          return p.extent[0] <= scaled && scaled <= p.extent[1];
        }) ? null : "none";
      });
    }
  });


  let ctx4 = document.getElementById("chart-evol");
  let myChart4 = new Chart(ctx4, {
    type: 'bubble',
    data: {
      datasets: [{
        data: [{
            x: 1, // value of feature
            y: 0, // Class of users
            v: 10 // Number of users
          },
          {
            x: 10, // value of feature
            y: 1, // Class of users
            v: 8 // Number of users
          },
          {
            x: 120, // value of feature
            y: 2, // Class of users
            v: 4 // Number of users
          },
          {
            x: 998, // value of feature
            y: 3, // Class of users
            v: 2 // Number of users
          },
          {
            x: 1500, // value of feature
            y: 4, // Class of users
            v: 1 // Number of users
          }
        ]
      }]
    },
    options: {
      aspectRatio: 1,
      elements: {
        point: {
          radius: function(context) {
            var value = context.dataset.data[context.dataIndex];
            var size = context.chart.width;
            var base = Math.abs(value.v) / 10;
            return (size / 24) * base;
          },
          backgroundColor: function(context) {
            var value = context.dataset.data[context.dataIndex];
            return ['#eff3ff', '#bdd7e7', '#6baed6', '#3182bd', '#08519c'][value.y];
          }
        }
      },
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
          type: 'logarithmic',
          gridLines: {
            color: '#ffffff',
            display: false
          },
          ticks: {
            fontColor: '#ffffff'
          }
        }]
      },
      legend: false
    }
  });

  $('#ex1').slider({
    formatter: function(value) {
      return 'Current value: ' + value;
    }
  });


  let ctx5 = document.getElementById("chart-cust");
  let myChart5 = new Chart(ctx5, {
    type: 'doughnut',
    data: {
      labels: ["One time users",
        "Occasinal users",
        "Common users",
        "Frequent users",
        "Super users"
      ],
      datasets: [{
        label: "",
        data: [1, 2, 4, 8, 16],
        backgroundColor: ['#eff3ff', '#bdd7e7', '#6baed6', '#3182bd', '#08519c']
      }]
    },
    options: {
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
