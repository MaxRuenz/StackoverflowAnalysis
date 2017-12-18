define(['d3', 'optionsHist'], function(d3, optionsHist){

    let currentUserInfo;

    function initializePage(userInfo){
      console.log("Hi");

      console.log(userInfo);

      currentUserInfo = userInfo;

      let ctx = document.getElementById("chart-descre");
      let myChart;
      let featureHist = "Reputation";
      let dataHist;

      d3.json("data/Hists.json", function(json) {
        dataHist = json;
        let userCat;
        if (typeof currentUserInfo !== 'undefined'){
          let userVal = currentUserInfo[featureHist];
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
          createHistogram(dataHist, userCat, featureHist);
        })

      });

      function createHistogram(data, userCat, feature) {
        data[feature].datasets[0].backgroundColor = ["#4292c6", "#4292c6", "#4292c6", "#4292c6", "#4292c6", "#4292c6", "#4292c6", "#4292c6", "#4292c6", "#4292c6", "#4292c6"];
        if (typeof userCat !== 'undefined')
          data[feature].datasets[0].backgroundColor[userCat] = '#00ff00';

        if (myChart){
          myChart.destroy()
        }
        myChart = new Chart(ctx, {
          type: 'bar',
          data: data[feature],
          options: optionsHist
        });
      }
    }

    return {
      initializePage: initializePage
    };
});
