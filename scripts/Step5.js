define(['d3'], function(d3){

    function initializePage(){
      console.log("Hi");
      const margin = {
        top: 30,
        right: 10,
        bottom: 10,
        left: 50
      };

      const bounds = d3.select('#div-cordinates').node().getBoundingClientRect(),
        widthPC = bounds.width - margin.left - margin.right,
        heightPC = bounds.height - margin.top - margin.bottom;

      let x = d3.scalePoint().range([0, widthPC], 1),
        y = {},
        dragging = {};

      let line = d3.line(),
        axis = d3.axisLeft(),
        background,
        foreground,
        dimensions;

      let svg = d3.select("#div-cordinates").append("svg")
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
        let g = svg.selectAll(".dimension")
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
          let v = dragging[d];
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

          let actives = [];
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
    }

    return {
      initializePage: initializePage
    };
});
