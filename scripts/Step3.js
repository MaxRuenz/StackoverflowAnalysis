define(['d3', 'optionsHist'], function(d3, optionsHist){

    function initializePage(){
      console.log("Hi");
      let ctx2 = document.getElementById("chart-class");
      let myChart2

      d3.json("data/classes.json", function(json) {
        let data = json;
        data.datasets[0].backgroundColor = ['#eff3ff', '#bdd7e7', '#bdd7e7', '#6baed6', '#6baed6', '#3182bd', '#3182bd', '#3182bd', '#3182bd', '#08519c'];

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
