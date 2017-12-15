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
              let base = Math.log(Math.sqrt(value.v));
              return (size / 100) * base;
            }
          }
        },
        scales: {
          yAxes: [{
            type: 'logarithmic',
            ticks: {
              beginAtZero: true,
              padding: 20,
              fontColor: '#ffffff',
              min: 1
            },
            gridLines: {
              color: '#d3d3d3'
            },
            scaleLabel: {}
          }],
          xAxes: [{
            type: 'logarithmic',
            gridLines: {
              color: '#d3d3d3',
            },
            ticks: {
              fontColor: '#ffffff',
              min: 1
            }
          }]
        }
      };

      let ctx4 = document.getElementById("chart-evol");
      let myChart4,
        dataClassEvol,
        featureClassEvol = "Questions",
        yearClassEvol = "2008";
      d3.json("data/user_classes_evol.json", function(json) {
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
          dataClassEvol[featureClassEvol][yearClassEvol].datasets[0].backgroundColor = '#e41a1c';
          dataClassEvol[featureClassEvol][yearClassEvol].datasets[1].backgroundColor = '#377eb8';
          dataClassEvol[featureClassEvol][yearClassEvol].datasets[2].backgroundColor = '#4daf4a';
          dataClassEvol[featureClassEvol][yearClassEvol].datasets[3].backgroundColor = '#984ea3';
          dataClassEvol[featureClassEvol][yearClassEvol].datasets[4].backgroundColor = '#ff7f00';

          myChart4.data.datasets[0].data = dataClassEvol[featureClassEvol][yearClassEvol].datasets[0].data;
          myChart4.data.datasets[1].data = dataClassEvol[featureClassEvol][yearClassEvol].datasets[1].data;
          myChart4.data.datasets[2].data = dataClassEvol[featureClassEvol][yearClassEvol].datasets[2].data;
          myChart4.data.datasets[3].data = dataClassEvol[featureClassEvol][yearClassEvol].datasets[3].data;
          myChart4.data.datasets[4].data = dataClassEvol[featureClassEvol][yearClassEvol].datasets[4].data;


          myChart4.update({
            duration: 500,
            easing: 'linear'
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
        let optionsWithMaxLimt = optionsBubble;
        if (feature === "Questions"){
          optionsWithMaxLimt.scales.yAxes[0].ticks.max = 50;
          optionsWithMaxLimt.scales.xAxes[0].ticks.max = 50;
        } else if (feature === "Answers") {
          optionsWithMaxLimt.scales.yAxes[0].ticks.max = 5;
          optionsWithMaxLimt.scales.xAxes[0].ticks.max = 450;
        }
        data[feature][yearClassEvol].datasets[0].backgroundColor = '#e41a1c';
        data[feature][yearClassEvol].datasets[1].backgroundColor = '#377eb8';
        data[feature][yearClassEvol].datasets[2].backgroundColor = '#4daf4a';
        data[feature][yearClassEvol].datasets[3].backgroundColor = '#984ea3';
        data[feature][yearClassEvol].datasets[4].backgroundColor = '#ff7f00';
        myChart4 = new Chart(ctx4, {
          type: 'bubble',
          data: data[feature][yearClassEvol],
          options: optionsWithMaxLimt
        });
      }
    }

    return {
      initializePage: initializePage
    };
});
