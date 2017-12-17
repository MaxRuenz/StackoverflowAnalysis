define(['d3'], function(d3){

    let userInformation;

    function initializePage(userInfo){

      userInformation = userInfo;

      console.log("Hi");
      const optionsBubble = {
        aspectRatio: 1,
        elements: {
          point: {
            radius: function(context) {
              let value = context.dataset.data[context.dataIndex];
              let size = context.chart.width;
              let base = Math.sqrt(value.v);
              return (size / 10000) * base;
            }
          }
        },
        scales: {
          yAxes: [{
            scaleLabel: {
              labelString: "Average Votes",
              display: true
            },
            type: 'logarithmic',
            ticks: {
              beginAtZero: true,
              padding: 20,
              fontColor: '#ffffff',
              min: 0.1,
              callback: function (tick) {
                if( tick.toString().startsWith( '1' ) ||
                    tick.toString().startsWith( '2' ) ||
                    tick.toString().startsWith( '5' ) )
                  return tick.toLocaleString();
                return null;
              }
            },
            gridLines: {
              color: '#d3d3d3'
            }
          }],
          xAxes: [{
            scaleLabel: {
              labelString: "Count",
              display: true
            },
            type: 'logarithmic',
            gridLines: {
              color: '#d3d3d3',
            },
            ticks: {
              fontColor: '#ffffff',
              min: 0.1,
              callback: function (tick) {
                if( tick.toString().startsWith( '1' ) ||
                    tick.toString().startsWith( '2' ) ||
                    tick.toString().startsWith( '5' ) )
                  return tick.toLocaleString();
                return null;
              }
            }
          }]
        },
        tooltips: {
          callbacks: {
            label: function(t, d) {
              let radius = d.datasets[t.datasetIndex].data[t.index].v
              return d.datasets[t.datasetIndex].label + ': ' +
                "Count: " + t.xLabel.toFixed(2) + ', ' +
                "Average Votes: " + t.yLabel.toFixed(2) + ', '+
                "Users: " + radius;
            }
         }
        }
      };

      let ctx4 = document.getElementById("chart-evol");
      let myChart4,
        dataClassEvol,
        featureClassEvol = "Questions",
        yearClassEvol = "2008";
      d3.json("data/user_classes_evol.json", function(json) {
        dataClassEvol = json;

        dataClassEvol = addUserData(dataClassEvol, userInformation);

        $('#SliderEvol').slider({
          step: 1,
          min: parseInt(getMinYear(dataClassEvol[featureClassEvol])),
          max: parseInt(getMaxYear(dataClassEvol[featureClassEvol])),
          value: parseInt(getMinYear(dataClassEvol[featureClassEvol]))
        });

        let updateSlider = function(slideEvt) {
          yearClassEvol = slideEvt.value.newValue;
          dataClassEvol[featureClassEvol][yearClassEvol].datasets[0].backgroundColor = '#e41a1c';
          dataClassEvol[featureClassEvol][yearClassEvol].datasets[1].backgroundColor = '#377eb8';
          dataClassEvol[featureClassEvol][yearClassEvol].datasets[2].backgroundColor = '#4daf4a';
          dataClassEvol[featureClassEvol][yearClassEvol].datasets[3].backgroundColor = '#984ea3';
          dataClassEvol[featureClassEvol][yearClassEvol].datasets[4].backgroundColor = '#ff7f00';
          if (typeof userInfo !== 'undefined'){
            dataClassEvol[featureClassEvol][yearClassEvol].datasets[5].backgroundColor = '#00ff00';
          }

          myChart4.data.datasets[0].data = dataClassEvol[featureClassEvol][yearClassEvol].datasets[0].data;
          myChart4.data.datasets[1].data = dataClassEvol[featureClassEvol][yearClassEvol].datasets[1].data;
          myChart4.data.datasets[2].data = dataClassEvol[featureClassEvol][yearClassEvol].datasets[2].data;
          myChart4.data.datasets[3].data = dataClassEvol[featureClassEvol][yearClassEvol].datasets[3].data;
          myChart4.data.datasets[4].data = dataClassEvol[featureClassEvol][yearClassEvol].datasets[4].data;
          if (typeof userInfo !== 'undefined'){
            myChart4.data.datasets[5].data = dataClassEvol[featureClassEvol][yearClassEvol].datasets[5].data;
          }

          myChart4.update({
            duration: 500,
            easing: 'linear'
          });
        }

        $('#SliderEvol').on("change", updateSlider);

        createClassesEvol(dataClassEvol, featureClassEvol);
        d3.select("#SelectClassesEvol").on("change", function() {
          featureClassEvol = this.value;
          createClassesEvol(dataClassEvol, featureClassEvol);
        });

        d3.select("#playBubble").on('click', function(){
          let currentYear = $('#SliderEvol').slider('getValue');
          let maxYear = 2018;
          let slide = function(){
             if (currentYear < maxYear){
               $('#SliderEvol').slider('setValue',currentYear+1, false, true);
               currentYear++;
               setTimeout(slide, 1500)
             }
          }
          setTimeout(slide, 1500)
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
        if (typeof userInfo !== 'undefined'){
          data[feature][yearClassEvol].datasets[5].backgroundColor = '#00ff00';
        }
        myChart4 = new Chart(ctx4, {
          type: 'bubble',
          data: data[feature][yearClassEvol],
          options: optionsWithMaxLimt
        });
      }
    }

    function addUserData(data, userInfo){
      console.log(data);
      console.log(userInfo);
      if (typeof userInfo === 'undefined'){
        return data;
      } else{
        let dataExtended = data;
        for (let i =2008; i<2018; i++){
          dataExtended.Answers[i+""].datasets.push({"data": [{"x":userInfo.data[i-2008]["acnt"],
                                                  "y":userInfo.data[i-2008]["avotes"],
                                                  "v":1000}], "label": "You"});
          dataExtended.Questions[i+""].datasets.push({"data": [{"x":userInfo.data[i-2008]["qcnt"],
                                                  "y":userInfo.data[i-2008]["qvotes"],
                                                  "v":1000}], "label": "You"});
          
        }
        console.log(dataExtended);
        return dataExtended;
      }

    }

    return {
      initializePage: initializePage
    };
});
