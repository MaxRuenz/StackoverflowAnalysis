define(['d3'], function(d3) {

  class StreamGraph {
    constructor(config) {

      let element = config.element,
        height = config.height,
        width = config.width,
        margins = config.margins,
        data = config.data,
        colorMap = config.colorMap;

      let svg = d3.select(element).append("svg").attr('width', width).attr('height', height);

      let x = d3.scaleLinear()
        .domain([d3.min(data, xMin), d3.max(data, xMax)])
        .range([0, width]);

      let y = d3.scaleLinear()
        .domain([d3.min(data, stackMin), d3.max(data, stackMax)])
        .range([height, 0]);

      let z = d3.interpolateCool;

      let area = d3.area()
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
        .data(data)
        .enter().append("path")
        .attr("d", function(d) {
          return area(d.data)
        })
        .attr("fill", function(d) {
          return colorMap[d.label];
        })
        .on("mouseover", function(d) {

          let rect = document.getElementById('div-stream').getBoundingClientRect();
          let xPosition = d3.event.pageX - rect.x;
          let yPosition = d3.event.pageY;

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
    }
  }

  return StreamGraph;

});
