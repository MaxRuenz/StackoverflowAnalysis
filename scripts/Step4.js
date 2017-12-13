define(['d3'], function(d3){

    function initializePage(currentUserInfo){
      console.log("Hi");
      let ctx3 = document.getElementById("chart-contrib");
      let myChart3;
      let userClassesFeature = "Reputation";
      let dataUserClassesFeature;
      d3.json("data/users_classes.json", function(json) {
        dataUserClassesFeature = json;
        // TODO fill table

        createUserClassesStats(dataUserClassesFeature, userClassesFeature);
        d3.select("#SelectUserClasses").on("change", function() {
          userClassesFeature = this.value;
          createUserClassesStats(dataUserClassesFeature, userClassesFeature);
        });

      });

      function createUserClassesStats(data, feature) {
        data[feature].datasets[0].backgroundColor = ['#eff3ff', '#bdd7e7', '#6baed6', '#3182bd', '#08519c'];
        myChart3 = new Chart(ctx3, {
          type: 'horizontalBar',
          data: data[feature],
          options: {
            legend: {
              position: 'bottom'
            }
          }
        });
      }
    }

    return {
      initializePage: initializePage
    };
});
