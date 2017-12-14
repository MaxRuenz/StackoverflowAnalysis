define(['d3', 'optionsHist'], function(d3, optionsHist){

    function initializePage(){
      console.log("Hi");
      let ctx2 = document.getElementById("chart-class");
      let myChart2

      d3.json("data/classes.json", function(json) {
        let data = json;
        data.datasets[0].backgroundColor = ['#e41a1c', '#377eb8', '#377eb8', '#4daf4a', '#4daf4a', '#984ea3', '#984ea3', '#ff7f00', '#ff7f00', '#ff7f00'];

        myChart2 = new Chart(ctx2, {
          type: 'bar',
          data: data,
          options: optionsHist
        });

      });
    }

    return {
      initializePage: initializePage
    };
});
