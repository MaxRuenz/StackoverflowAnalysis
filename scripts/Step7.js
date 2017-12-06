define(['d3'], function(d3){

    function initializePage(){
      console.log("Hi");
      const optionsBubble = {
        aspectRatio: 1,
        elements: {
          point: {
            radius: function(context) {
              let value = context.dataset.data[context.dataIndex];
              let size = context.chart.width;
              let base = Math.abs(value.v) / 10;
              return (size / 24) * base;
            },
            backgroundColor: function(context) {
              let value = context.dataset.data[context.dataIndex];
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
    }

    return {
      initializePage: initializePage
    };
});
