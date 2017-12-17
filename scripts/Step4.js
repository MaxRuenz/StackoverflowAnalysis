define(['d3'], function(d3) {

  const tableElement = '#table-user-classes'
  let currentUserInfo;
  let myChart3;

  let ctx3 = document.getElementById("chart-contrib");
  let userClassesFeature = "Reputation";
  let dataUserClassesFeature;

  function initializePage(userInfo) {
    console.log("Hi");

    currentUserInfo = userInfo;
    d3.json("data/users_classes.json", function(json) {
      dataUserClassesFeature = json;
      // fill table
      let tableData = [];
      tableData.push({"Column": "Reputation", "Values": dataUserClassesFeature.Reputation});
      tableData.push({"Column": "Votes", "Values": dataUserClassesFeature.Votes});
      tableData.push({"Column": "Questions", "Values": dataUserClassesFeature.Questions});
      tableData.push({"Column": "Answers", "Values": dataUserClassesFeature.Answers});
      tableData.push({"Column": "Average Answer Votes", "Values": dataUserClassesFeature['Average Answer Votes']});
      tableData.push({"Column": "Average Question Votes", "Values": dataUserClassesFeature['Average Question Votes']});
      tableData.push({"Column": "Users", "Values": dataUserClassesFeature.Users});

      createTable(tableData);

      let userVal;
      if (typeof currentUserInfo !== 'undefined'){
        if (userClassesFeature === 'Reputation'){
          userVal = currentUserInfo["Reputation"];
        } else if (userClassesFeature === 'Votes'){
          userVal = currentUserInfo.data[9]["votes"];
        } else if (userClassesFeature === 'Questions'){
          userVal = currentUserInfo.data[9]["qcnt"];
        } else if (userClassesFeature === 'Answers'){
          userVal = currentUserInfo.data[9]["acnt"];
        } else if (userClassesFeature === 'Average Answer Votes'){
          userVal = currentUserInfo.data[9]["avotes"];
        } else if (userClassesFeature === 'Average Question Votes'){
          userVal = currentUserInfo.data[9]["qvotes"];
        }
      }

      createUserClassesStats(dataUserClassesFeature, userClassesFeature, userVal);

    });


  }

  function createUserClassesStats(json, feature, userValue) {
    let userIndex = -1;
    let jsonWithUser = json;
    if (typeof userValue !== 'undefined'){
      for (let i = 0; i < json[feature].length; i++){
        if (json[feature][i] >= userValue){
          userIndex = i;
          break;
        } else if (i === json[feature].length-1){
          userIndex = i+1;
        }
      }
      console.log(userIndex);
      jsonWithUser[feature].splice(userIndex, 0, userValue);
    }


    let data = generateDataConfig(jsonWithUser);

    if (userIndex !== -1)
      data[feature]["labels"].splice(userIndex, 0, "You");

    data[feature].datasets[0].backgroundColor = ['#eff3ff', '#bdd7e7', '#6baed6', '#3182bd', '#08519c'];

    if (userIndex !== -1)
      data[feature].datasets[0].backgroundColor.splice(userIndex, 0, '#00ff00');

    if (myChart3){
      myChart3.destroy();
    }
    myChart3 = new Chart(ctx3, {
      type: 'horizontalBar',
      data: data[feature],
      options: {
        legend: false,
        responsive: true,
        maintainAspectRatio: false,
        scales: {xAxes:[{
          scaleLabel: {
            display: true,
            labelString: feature
          }
        }]}
      }
    });
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

    let thead = d3.select(tableElement).append('thead');
    let head = thead.selectAll('tr')
                .data([["Feature","Inactive Users", "One Time Users", "Active Users", "Frequent Users", "Super Users"]])
                .enter()
                .append('tr')
    for (let i = 0; i<6; i++){
      head.append('th')
        .text(function (d) {return d[i]})
    }

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

    rows.on('click', function(d){
      let feature = d.Column;
      let userVal;
      if (typeof currentUserInfo !== 'undefined'){
        if (feature === 'Reputation'){
          userVal = currentUserInfo["Reputation"];
        } else if (feature === 'Votes'){
          userVal = currentUserInfo.data[9]["votes"];
        } else if (feature === 'Questions'){
          userVal = currentUserInfo.data[9]["qcnt"];
        } else if (feature === 'Answers'){
          userVal = currentUserInfo.data[9]["acnt"];
        } else if (feature === 'Average Answer Votes'){
          userVal = currentUserInfo.data[9]["avotes"];
        } else if (feature === 'Average Question Votes'){
          userVal = currentUserInfo.data[9]["qvotes"];
        }
      }
      console.log(userVal);
      createUserClassesStats(dataUserClassesFeature, feature, userVal);
    })
  }

  return {
    initializePage: initializePage
  };
});
