define(['d3', 'optionsHist'], function(d3, optionsHist){

    function initializePage(){
      console.log("Hi");

      let ctx = document.getElementById("chart-descre");
      let myChart;
      let featureHist = "Reputation";
      let dataHist;

      d3.json("data/Hists.json", function(json) {
        dataHist = json;

        createHistogram(dataHist, featureHist);
        d3.select("#SelectHist").on("change", function() {
          featureHist = this.value;
          createHistogram(dataHist, featureHist);
        })

      });

      function createHistogram(data, feature) {
        data[feature].datasets[0].backgroundColor = ["#4292c6", "#4292c6", "#4292c6", "#4292c6", "#4292c6", "#4292c6", "#4292c6", "#4292c6", "#4292c6", "#4292c6"];
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
