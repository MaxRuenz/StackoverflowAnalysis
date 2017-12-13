define(['d3'], function(d3) {

  const tableElement = '#table-user-classes'

  function initializePage(currentUserInfo) {
    console.log("Hi");
    let ctx3 = document.getElementById("chart-contrib");
    let myChart3;
    let userClassesFeature = "Reputation";
    let dataUserClassesFeature;
    d3.json("data/users_classes.json", function(json) {
      dataUserClassesFeature = json;
      // fill table
      let tableData = [];
      tableData.push({"Column": "Reputation", "Values": dataUserClassesFeature.Reputation});
      tableData.push({"Column": "Answers", "Values": dataUserClassesFeature.Answers});

      createTable(tableData);

      createUserClassesStats(dataUserClassesFeature, userClassesFeature);
      d3.select("#SelectUserClasses").on("change", function() {
        userClassesFeature = this.value;
        createUserClassesStats(dataUserClassesFeature, userClassesFeature);
      });

    });

    function createUserClassesStats(json, feature) {
      let data = generateDataConfig(json);
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

  function generateDataConfig(json) {
    let config = Object.assign(...Object.entries(json).map(([k, v]) => ({
      [k]: {
        "labels": ["One time users",
          "Occasinal users",
          "Common users",
          "Frequent users",
          "Super users"
        ],
        "datasets": [{
          "label": k,
          "data": v

        }]
      }
    })));
    console.log(config);
    return config;
  }

  function createTable(data){
    d3.select(tableElement).html('');

    let tbody = d3.select(tableElement).append('tbody');
    let rows = tbody.selectAll('tr')
                .data(data)
                .enter()
                .append('tr')
    rows.append('th')
      .text(function (d) {return d.Column})
    for (let i = 0; i<5; i++){
      rows.append('td')
        .text(function (d) {return d.Values[i]})
    }
  }

  return {
    initializePage: initializePage
  };
});
