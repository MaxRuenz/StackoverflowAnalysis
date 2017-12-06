define(['d3'], function(d3){

    function initializePage(){
      console.log("Hi");
      let ctx5 = document.getElementById("chart-cust");
      d3.csv("data/users.csv", function(csv) {
        // TODO calcuate classes and create table
        let myChart5 = new Chart(ctx5, {
          type: 'horizontalBar',
          data: {
            labels: ["One time users",
              "Occasinal users",
              "Common users",
              "Frequent users",
              "Super users"
            ].reverse(),
            datasets: [{
              label: "",
              data: [1, 2, 4, 8, 16].reverse(),
              backgroundColor: ['#eff3ff', '#bdd7e7', '#6baed6', '#3182bd', '#08519c'].reverse()
            }]
          },
          options: {
            legend: {
              position: 'bottom'
            }
          }
        });
      });

      $('#slider').slider({
        formatter: function(value) {
          return 'Current value: ' + value;
        }
      });
      $("#slider").on("slide", function(slideEvt) {
        $("#vote-current").text(slideEvt.value);
      });
    }

    return {
      initializePage: initializePage
    };
});
