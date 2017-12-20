define(['d3', 'optionsHist'], function(d3, optionsHist){

    let currentUserInfo;
    let myChart;

    function initializePage(userInfo){
      console.log("Hi");

      console.log(userInfo);

      currentUserInfo = userInfo;

      let ctx = document.getElementById("chart-descre");
      let featureHist = "Reputation";

      d3.select("#SelectHist").property('value', featureHist);

      let dataHist;

      d3.json("data/Hists.json", function(json) {
        dataHist = json;
        let userCat;
        if (typeof currentUserInfo !== 'undefined'){
          let userVal = currentUserInfo[featureHist];
          console.log(userVal);
          for (let i = 0; i < dataHist[featureHist]["labels"].length; i++){
            let border;
            if (dataHist[featureHist]["labels"][i].includes("-")){
              border = parseInt(dataHist[featureHist]["labels"][i].split("-")[1].replace(".", ""));
              if (border >= userVal){
                userCat = i;
                break;
              }
            }
          }
          if (typeof userCat === 'undefined'){
            userCat = dataHist[featureHist]["labels"].length-1;
          }
          console.log(userCat);
        }

        createHistogram(dataHist, userCat, featureHist);
        d3.select("#SelectHist").on("change", function() {
          featureHist = this.value;

          if (typeof currentUserInfo !== 'undefined'){
            let userVal;
            if (featureHist === "Reputation"){
              userVal = currentUserInfo[featureHist];
            } else if (featureHist === "Answers"){
              userVal = currentUserInfo.data[9]["acnt"];
            } else if (featureHist === "Questions"){
              userVal = currentUserInfo.data[9]["qcnt"];
            }
            console.log(userVal);
            for (let i = 0; i < dataHist[featureHist]["labels"].length; i++){
              let border;
              if (dataHist[featureHist]["labels"][i].includes("-")){
                border = parseInt(dataHist[featureHist]["labels"][i].split("-")[1].replace(".", ""));
                if (border >= userVal){
                  userCat = i;
                  break;
                }
              }
            }
            if (typeof userCat === 'undefined'){
              userCat = dataHist[featureHist]["labels"].length-1;
            }
            console.log(userCat);
          }

          createHistogram(dataHist, userCat, featureHist);
        })

      });

      function createHistogram(data, userCat, feature) {
        data[feature].datasets[0].backgroundColor = ["#4292c6", "#4292c6", "#4292c6", "#4292c6", "#4292c6", "#4292c6", "#4292c6", "#4292c6", "#4292c6", "#4292c6", "#4292c6"];
        if (typeof userCat !== 'undefined')
          data[feature].datasets[0].backgroundColor[userCat] = '#ffff33';

        let myOpt = optionsHist;
        myOpt.scales.xAxes[0].scaleLabel.labelString = feature;

        if (myChart){
          myChart.destroy();
        }
        myChart = new Chart(ctx, {
          type: 'bar',
          data: data[feature],
          options: myOpt
        });
      }
    }

    return {
      initializePage: initializePage
    };
});
