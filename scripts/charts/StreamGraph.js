define(['d3'], function(d3) {

  class StreamGraph {
    constructor(config) {

      this.element = config.element;
      this.height = config.height;
      this.width = config.width;
      this.margins = config.margins;
      this.data = config.data;
      this.colorMap = config.colorMap;

      this.svg = d3.select(this.element)
        .append("svg")
        .attr('width', this.width)
        .attr('height', this.height)
        .append("g");

      this.x = d3.scaleLinear()
        .domain([d3.min(this.data, xMin), d3.max(this.data, xMax)])
        .range([0, this.width]);

      this.y = d3.scaleLinear()
        .domain([d3.min(this.data, stackMin), d3.max(this.data, stackMax)])
        .range([this.height, 0]);

      this.z = d3.interpolateCool;

      this.area = d3.area()
        .x(function(d) {
          return this.x(d[0]);
        }.bind(this))
        .y0(function(d) {
          return this.y(d[1]);
        }.bind(this))
        .y1(function(d) {
          return this.y(d[2]);
        }.bind(this));

      drawChart.call(this);
    }

    resize(width, height) {
      d3.select(this.element).select("g").attr("transform", "scale(" + width / this.width + "," + height / this.height + ")");
      this.width = width;
      this.height = height;
    }

    destroy() {
      d3.select(this.element).select("svg").select("g").selectAll('*').remove();
    }

    update(data) {
        this.data = data;
        console.log(this.data);
        this.x = d3.scaleLinear()
          .domain([d3.min(this.data, xMin), d3.max(this.data, xMax)])
          .range([0, this.width]);

        this.y = d3.scaleLinear()
          .domain([d3.min(this.data, stackMin), d3.max(this.data, stackMax)])
          .range([this.height, 0]);
        this.destroy();
        drawChart.call(this);
    }

  }

  function drawChart() {

    this.svg.selectAll("path")
      .data(this.data)
      .enter().append("path")
      .attr("d", function(d) {
        return this.area(d.data)
      }.bind(this))
      .attr("fill", function(d) {
        return this.colorMap[d.label];
      }.bind(this))
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

  }

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

  return StreamGraph;

});
