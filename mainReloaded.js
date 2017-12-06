'use strict';

$(function() {
  // Wait until HTML is loaded

  $('#myCarousel').carousel({
    interval: false,
    wrap: false
  });

  $('#myCarousel').on('slid.bs.carousel', function(event) {
    let page = event.to;
    if (page === 5) {
      let margin = {
        top: 30,
        right: 10,
        bottom: 10,
        left: 50
      };

      let bounds = d3.select('#div-cordinates').node().getBoundingClientRect(),
        widthPC = bounds.width - margin.left - margin.right,
        heightPC = bounds.height - margin.top - margin.bottom;

      var x = d3.scalePoint().range([0, widthPC], 1),
        y = {},
        dragging = {};

      var line = d3.line(),
        axis = d3.axisLeft(),
        background,
        foreground,
        dimensions;

      var svg = d3.select("#div-cordinates").append("svg")
        .attr("width", widthPC + margin.left + margin.right + 'px')
        .attr("height", heightPC + margin.top + margin.bottom + 'px')
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      d3.csv("data/users.csv", function(error, cars) {

        // Extract the list of dimensions and create a scale for each.
        x.domain(dimensions = d3.keys(cars[0]).filter(function(d) {
          return (y[d] = d3.scaleLinear()
            .domain(d3.extent(cars, function(p) {
              return +p[d];
            }))
            .range([heightPC, 0]));
        }));

        let valRanges = dimensions.map(function(d) {
          return d3.extent(cars, function(p) {
            return +p[d];
          })
        });

        let valRangesObj = {};
        for (let i = 0; i < dimensions.length; i++) {
          valRangesObj[dimensions[i]] = valRanges[i];
        }

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
              dragging[d] = Math.min(widthPC, Math.max(0, d3.event.x));
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
              .extent([
                [-8, 0],
                [8, heightPC]
              ])
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
              let scaled = d3.scaleLinear().domain(valRangesObj[p.dimension]).range([heightPC, 0])(d[p.dimension]);
              return p.extent[0] <= scaled && scaled <= p.extent[1];
            }) ? null : "none";
          });
        }
      });
    } else if (page === 6) {

      let margin = {
        top: 30,
        right: 10,
        bottom: 10,
        left: 50
      };

      let bounds = d3.select('#div-stream').node().getBoundingClientRect(),
        widthSC = bounds.width - margin.left - margin.right,
        heightSC = bounds.height - margin.top - margin.bottom;


      // stream Chart

      let colorMap = {
        "Questions": '#ff0000',
        "Answers": '#0000ff'
      };

      d3.json("data/QA_time.json", function(json) {
        let layers = json;

        var svg = d3.select("#div-stream").append("svg").attr('width', widthSC).attr('height', heightSC);

        var x = d3.scaleLinear()
          .domain([d3.min(layers, xMin), d3.max(layers, xMax)])
          .range([0, widthSC]);

        var y = d3.scaleLinear()
          .domain([d3.min(layers, stackMin), d3.max(layers, stackMax)])
          .range([heightSC, 0]);

        var z = d3.interpolateCool;

        var area = d3.area()
          .x(function(d) {
            return x(d[0]);
          })
          .y0(function(d) {
            return y(d[1]);
          })
          .y1(function(d) {
            return y(d[2]);
          });

        svg.selectAll("path")
          .data(layers)
          .enter().append("path")
          .attr("d", function(d) {
            return area(d.data)
          })
          .attr("fill", function(d) {
            return colorMap[d.label];
          })
          .on("mouseover", function(d) {

            let rect = document.getElementById('div-stream').getBoundingClientRect();
            var xPosition = d3.event.pageX - rect.x;
            var yPosition = d3.event.pageY;

            d3.select("#tooltip")
              .style("left", xPosition + "px")
              .style("top", yPosition + "px")
              .select("#value")
              .text(d.label);

            d3.select("#tooltip").classed("hidden", false);
          })
          .on("mouseout", function() {
            d3.select("#tooltip").classed("hidden", true);
          });

        function xMax(layer) {
          let data = layer.data;
          return d3.max(data, function(d) {
            return d[0];
          });
        }

        function xMin(layer) {
          let data = layer.data;
          return d3.min(data, function(d) {
            return d[0];
          });
        }

        function stackMax(layer) {
          let data = layer.data;
          return d3.max(data, function(d) {
            return Math.max(d[1], d[2]);
          });
        }

        function stackMin(layer) {
          let data = layer.data;
          return d3.min(data, function(d) {
            return Math.min(d[1], d[2]);
          });
        }

      });
    }
  });

  let optionsBubble = {
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
  };

  let ctx4 = document.getElementById("chart-evol");
  let myChart4,
    dataClassEvol,
    featureClassEvol = "Reputation",
    yearClassEvol = "2008";
  d3.json("data/users_classes_evol.json", function(json) {
    dataClassEvol = json;

    d3.json("data/users_classes.json", function(json) {
      dataUserClassesFeature = json;
      // TODO fill table

      $('#SliderEvol').slider({
        step: 1,
        min: parseInt(getMinYear(dataClassEvol[featureClassEvol])),
        max: parseInt(getMaxYear(dataClassEvol[featureClassEvol])),
        value: parseInt(getMinYear(dataClassEvol[featureClassEvol]))
      });
    });

    $('#SliderEvol').on("change", function(slideEvt) {
      yearClassEvol = slideEvt.value.newValue;
      myChart4.data = dataClassEvol[featureClassEvol][yearClassEvol];
      myChart4.update({
        duration: 0,
        easing: 'easeOutBounce'
      });
    });

    createClassesEvol(dataClassEvol, featureClassEvol);
    d3.select("#SelectClassesEvol").on("change", function() {
      featureClassEvol = this.value;
      createClassesEvol(dataClassEvol, featureClassEvol);
    });

  });

  function getMinYear(dict) {
    console.log(dict);
    return Object.keys(dict).reduce(function(a, b) {
      return a < b ? a : b
    });
  }

  function getMaxYear(dict) {
    return Object.keys(dict).reduce(function(a, b) {
      return a > b ? a : b
    });
  }

  function createClassesEvol(data, feature) {
    if (myChart4) {
      myChart4.destroy();
    }
    myChart4 = new Chart(ctx4, {
      type: 'bubble',
      data: data[feature][yearClassEvol],
      options: optionsBubble
    });
  }


  let ctx5 = document.getElementById("chart-cust");
  d3.csv("data/users.csv", function(csv) {
    // TODO calcuate classes and create table
    let myChart5 = new Chart(ctx5, {
      type: 'horizontalBar',
      data: {
        labels: ["One time users",
          "Occasinal users",
          "Common users",
          "Frequent users",
          "Super users"
        ].reverse(),
        datasets: [{
          label: "",
          data: [1, 2, 4, 8, 16].reverse(),
          backgroundColor: ['#eff3ff', '#bdd7e7', '#6baed6', '#3182bd', '#08519c'].reverse()
        }]
      },
      options: {
        legend: {
          position: 'bottom'
        }
      }
    });
  });


  d3.select("#SubmitUserID").on('click', function() {
    let userID = d3.select('#InputUserID').node().value
    d3.json('user.json?' + userID, function() {
      // TODO fill table
    });
  });

  let optionsHist = {
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
  };

  let ctx = document.getElementById("chart-descre");
  let myChart;
  let featureHist = "Reputation";
  let dataHist;

  d3.json("data/Hists.json", function(json) {
    dataHist = json;

    createHistogram(dataHist, featureHist);
    d3.select("#SelectHist").on("change", function() {
      featureHist = this.value;
      createHistogram(dataHist, featureHist);
    })

  });

  function createHistogram(data, feature) {
    data[feature].datasets[0].backgroundColor = ["#4292c6", "#4292c6", "#4292c6", "#4292c6", "#4292c6", "#4292c6", "#4292c6", "#4292c6", "#4292c6", "#4292c6"];
    myChart = new Chart(ctx, {
      type: 'bar',
      data: data[feature],
      options: optionsHist
    });
  }

  let ctx2 = document.getElementById("chart-class");
  let myChart2

  d3.json("data/classes.json", function(json) {
    let data = json;
    data.datasets[0].backgroundColor = ['#eff3ff', '#bdd7e7', '#bdd7e7', '#6baed6', '#6baed6', '#3182bd', '#3182bd', '#3182bd', '#3182bd', '#08519c'];

    myChart2 = new Chart(ctx2, {
      type: 'bar',
      data: data,
      options: optionsHist
    });

  });


  let ctx3 = document.getElementById("chart-contrib");
  let myChart3;
  let userClassesFeature = "Reputation";
  let dataUserClassesFeature;
  d3.json("data/users_classes.json", function(json) {
    dataUserClassesFeature = json;
    // TODO fill table

    createUserClassesStats(dataUserClassesFeature, userClassesFeature);
    d3.select("#SelectUserClasses").on("change", function() {
      userClassesFeature = this.value;
      createUserClassesStats(dataUserClassesFeature, userClassesFeature);
    });

  });

  function createUserClassesStats(data, feature) {
    data[feature].datasets[0].backgroundColor = ['#eff3ff', '#bdd7e7', '#6baed6', '#3182bd', '#08519c'];
    myChart3 = new Chart(ctx3, {
      type: 'horizontalBar',
      data: data[feature],
      options: {
        legend: {
          position: 'bottom'
        }
      }
    });
  }

  $('#slider').slider({
    formatter: function(value) {
      return 'Current value: ' + value;
    }
  });
  $("#slider").on("slide", function(slideEvt) {
    $("#vote-current").text(slideEvt.value);
  });
});
