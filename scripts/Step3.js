define(['d3', 'optionsHist'], function(d3, optionsHist){

    let currentUserInfo;

    function initializePage(userInfo){
      console.log("Hi");

      currentUserInfo = userInfo;

      let ctx2 = document.getElementById("chart-class");
      let myChart2;

      d3.json("data/classes.json", function(json) {
        let data = json;

        let userCat;
        if (typeof currentUserInfo !== 'undefined'){
          let userVal = currentUserInfo["Reputation"];
          for (let i = 0; i < data["labels"].length; i++){
            let border;
            if (data["labels"][i].includes("-")){
              border = parseInt(data["labels"][i].split("-")[1].replace(".", ""));
              if (border >= userVal){
                userCat = i;
                break;
              }
            }
          }
          if (typeof userCat === 'undefined'){
            userCat = data["labels"].length-1;
          }
          console.log(userCat);
        }

        data.datasets[0].backgroundColor = ['#e41a1c', '#377eb8', '#377eb8', '#4daf4a', '#4daf4a', '#984ea3', '#984ea3', '#ff7f00', '#ff7f00', '#ff7f00'];
        if (typeof userCat !== 'undefined')
          data.datasets[0].backgroundColor[userCat] = '#00ff00';

        let myOpt = optionsHist;
        myOpt.scales.xAxes[0].scaleLabel.labelString = "Reputation";

        if (myChart2){
          myChart2.destroy()
        }
        myChart2 = new Chart(ctx2, {
          type: 'bar',
          data: data,
          options: myOpt
        });

      });
    }

    return {
      initializePage: initializePage
    };
});
