define(['d3'], function(d3){

    function initializePage(){
      console.log("Hi");
      const margin = {
        top: 30,
        right: 10,
        bottom: 10,
        left: 50
      };

      const bounds = d3.select('#div-stream').node().getBoundingClientRect(),
        widthSC = bounds.width - margin.left - margin.right,
        heightSC = bounds.height - margin.top - margin.bottom;


      // stream Chart

      const colorMap = {
        "Questions": '#ff0000',
        "Answers": '#0000ff'
      };

      d3.json("data/QA_time.json", function(json) {
        let layers = json;

        let svg = d3.select("#div-stream").append("svg").attr('width', widthSC).attr('height', heightSC);

        let x = d3.scaleLinear()
          .domain([d3.min(layers, xMin), d3.max(layers, xMax)])
          .range([0, widthSC]);

        let y = d3.scaleLinear()
          .domain([d3.min(layers, stackMin), d3.max(layers, stackMax)])
          .range([heightSC, 0]);

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

      });
    }

    return {
      initializePage: initializePage
    };
});
