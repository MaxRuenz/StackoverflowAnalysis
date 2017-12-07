define(['d3'], function(d3) {

  class ParrallelCordinates {
    constructor(config) {

      this.element = config.element;
      this.height = config.height;
      this.width = config.width;
      this.margins = config.margins;
      this.data = config.data;

      this.x = d3.scalePoint().range([0, this.width], 1);
      this.y = {};
      this.dragging = {};

      this.line = d3.line();
      this.axis = d3.axisLeft();
      this.background;
      this.foreground;
      this.dimensions;

      this.svg = d3.select(this.element).append("svg")
        .attr("width", this.width + this.margins.left + this.margins.right + 'px')
        .attr("height", this.height + this.margins.top + this.margins.bottom + 'px')
        .append("g")
        .attr("transform", "translate(" + this.margins.left + "," + this.margins.top + ")");

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
      this.destroy();
      this.data = data;
      drawChart.call(this);
    }

  }

  function drawChart() {
    // Extract the list of dimensions and create a scale for each.
    this.x.domain(this.dimensions = d3.keys(this.data[0]).filter(function(d) {
      return (this.y[d] = d3.scaleLinear()
        .domain(d3.extent(this.data, function(p) {
          return +p[d];
        }))
        .range([this.height, 0]));
    }.bind(this)));

    this.valRanges = this.dimensions.map(function(d) {
      return d3.extent(this.data, function(p) {
        return +p[d];
      })
    }.bind(this));

    this.valRangesObj = {};
    for (let i = 0; i < this.dimensions.length; i++) {
      this.valRangesObj[this.dimensions[i]] = this.valRanges[i];
    }

    // Add grey background lines for context.
    this.background = this.svg.append("g")
      .attr("class", "background")
      .selectAll("path")
      .data(this.data)
      .enter().append("path")
      .attr("d", path.bind(this));

    // Add blue foreground lines for focus.
    this.foreground = this.svg.append("g")
      .attr("class", "foreground")
      .selectAll("path")
      .data(this.data)
      .enter().append("path")
      .attr("d", path.bind(this));

    // Add a group element for each dimension.
    let g = this.svg.selectAll(".dimension")
      .data(this.dimensions)
      .enter().append("g")
      .attr("class", "dimension")
      .attr("class", "brush")
      .attr("transform", function(d) {
        return "translate(" + this.x(d) + ")";
      }.bind(this))
      .call(d3.drag()
        .subject(function(d) {
          return {
            x: this.x(d)
          };
        })
        .on("start", function(d) {
          dragging[d] = this.x(d);
          background.attr("visibility", "hidden");
        })
        .on("drag", function(d) {
          dragging[d] = Math.min(this.width, Math.max(0, d3.event.x));
          foreground.attr("d", path);
          dimensions.sort(function(a, b) {
            return position(a) - position(b);
          });
          x.domain(this.dimensions);
          g.attr("transform", function(d) {
            return "translate(" + position(d) + ")";
          })
        })
        .on("end", function(d) {
          delete dragging[d];
          transition(d3.select(this)).attr("transform", "translate(" + x(d) + ")");
          transition(this.foreground).attr("d", path);
          this.background
            .attr("d", path)
            .transition()
            .delay(500)
            .duration(0)
            .attr("visibility", null);
        }));

    let that = this;
    // Add an axis and title.
    g.append("g")
      .attr("class", "axis")
      .each(function(d) {
        d3.select(this).call(that.axis.scale(that.y[d]));
      })
      .append("text")
      .style("text-anchor", "middle")
      .attr("y", -9)
      .text(function(d) {
        return d;
      });

    let y = this.y;
    // Add and store a brush for each axis.
    g.append("g")
      .attr("class", "brush")
      .each(function(d) {
        d3.select(this).call(y[d].brush = d3.brushY(y[d])
          .extent([
            [-8, 0],
            [8, that.height]
          ])
          .on("start", brushstart)
          .on("brush", brush.bind(that)));
      })
      .selectAll("rect")
      .attr("x", -8)
      .attr("width", 16);
  }

  function position(d) {
    let v = this.dragging[d];
    return v == null ? this.x(d) : v;
  }

  function transition(g) {
    return g.transition().duration(500);
  }

  // Returns the path for a given data point.
  function path(d) {
    return this.line(this.dimensions.map(function(p) {
      return [position.call(this, p), this.y[p](d[p])];
    }.bind(this)));
  }

  function brushstart() {
    d3.event.sourceEvent.stopPropagation();
  }

  // Handles a brush event, toggling the display of foreground lines.
  function brush() {

    let actives = [];
    this.svg.selectAll(".brush")
      .filter(function(d) {
        return d3.brushSelection(this);
      })
      .each(function(d) {
        actives.push({
          dimension: d,
          extent: d3.brushSelection(this)
        });
      });

    this.foreground.style("display", function(d) {
      return actives.every(function(p) {
        let scaled = d3.scaleLinear().domain(this.valRangesObj[p.dimension]).range([this.height, 0])(d[p.dimension]);
        return p.extent[0] <= scaled && scaled <= p.extent[1];
      }.bind(this)) ? null : "none";
    }.bind(this));
  }

  return ParrallelCordinates;

});
