define(['d3'], function(d3) {

  class ParrallelCordinates {
    constructor(config) {

      this.element = config.element;
      this.height = config.height;
      this.width = config.width;
      this.margins = config.margins;
      this.data = config.data;
      if (typeof config.user !== 'undefined'){
        this.userdata = [config.user];
      } else {
        this.userdata = [];
      }
      this.userdata["columns"] = this.data["columns"];

      console.log(this.data);
      console.log(this.userdata);

      this.x = d3.scalePoint().range([0, this.width], 1);
      this.y = {};
      this.dragging = {};

      this.line = d3.line();
      this.axis = d3.axisLeft();
      this.background;
      this.foreground;
      this.userground;
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
      return (this.y[d] = d3.scaleLog()
        .domain(d3.extent(this.data.concat(this.userdata), function(p) {
          return +p[d];
        }))
        .range([this.height, 0]));
    }.bind(this)));

    this.valRanges = this.dimensions.map(function(d) {
      return d3.extent(this.data.concat(this.userdata), function(p) {
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

    this.userground = this.svg.append("g")
      .attr("class", "userground")
      .selectAll("path")
      .data(this.userdata)
      .enter().append("path")
      .attr("d", path.bind(this));

    let that = this;
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
        }.bind(this))
        .on("start", function(d) {
          this.dragging[d] = this.x(d);
          this.background.attr("visibility", "hidden");
        }.bind(this))
        .on("drag", function(d) {
          this.dragging[d] = Math.min(this.width, Math.max(0, d3.event.x));
          this.foreground.attr("d", path.bind(this));
          this.userground.attr("d", path.bind(this));
          this.dimensions.sort(function(a, b) {
            return position.call(that,a) - position.call(that,b);
          });
          that.x.domain(this.dimensions);
          g.attr("transform", function(d) {
            return "translate(" + position.call(that, d) + ")";
          })
        }.bind(this))
        .on("end", function(d) {
          delete that.dragging[d];
          transition(d3.select(this)).attr("transform", "translate(" + that.x(d) + ")");
          transition(that.foreground).attr("d", path.bind(that));
          transition(that.userground).attr("d", path.bind(that));
          that.background
            .attr("d", path.bind(that))
            .transition()
            .delay(500)
            .duration(0)
            .attr("visibility", null);
        })
    );

    // Add an axis and title.
    g.append("g")
      .attr("class", "axis")
      .each(function(d) {
        d3.select(this).call(that.axis.scale(that.y[d]).ticks(10, ",.1s"));
      })
      .append("text")
      .style("text-anchor", "middle")
      .style("font-size", "200%")
      .attr("y", -9)
      .text(function(d) {
        return d;
      });

    // Add and store a brush for each axis.
    g.append("g")
      .attr("class", "brush")
      .each(function(d) {
        d3.select(this).call(that.y[d].brush = d3.brushY(that.y[d])
          .extent([
            [-8, 0],
            [8, that.height]
          ])
          .on("start", brushstart)
          .on("brush", brush.bind(that))
          .on("end", brush.bind(that)));
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
        let scaled = d3.scaleLog().domain(this.valRangesObj[p.dimension]).range([this.height, 0])(d[p.dimension]);
        return p.extent[0] <= scaled && scaled <= p.extent[1];
      }.bind(this)) ? null : "none";
    }.bind(this));
  }

  return ParrallelCordinates;

});
