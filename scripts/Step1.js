define(['d3'], function(d3){

    let userInformation;
    const tableElement = '#table-user'

    function initializePage(){
      console.log("Hi");
      d3.select("#SubmitUserID").on('click', function() {
        let userID = d3.select('#InputUserID').node().value
        d3.json('data/users/' + userID +'.json', function(data) {
          console.log(data);
          userInformation = data;

          let tableData = [];
          tableData.push({"Column": "Reputation", "Value": userInformation.Reputation});
          tableData.push({"Column": "Questions", "Value": userInformation.data[9]["qcnt"]});
          tableData.push({"Column": "Question Votes", "Value": userInformation.data[9]["qvotes"]});
          //tableData.push({"Column": "Avg. Question Votes", "Value": userInformation.data[9]["qcnt"]});
          tableData.push({"Column": "Answers", "Value": userInformation.data[9]["acnt"]});
          tableData.push({"Column": "Answer Votes", "Value": userInformation.data[9]["avotes"]});
          //tableData.push({"Column": "Avg. Answer Votes", "Value": userInformation.data[9]["qcnt"]});
          tableData.push({"Column": "Votes", "Value": userInformation.data[9]["votes"]});

          createTable(tableData);
        });
      });
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
      rows.append('td')
        .text(function (d) {return d.Value})
    }

    function getUserInformation(){
      console.log(userInformation);
      return userInformation;
    }

    return {
      initializePage: initializePage,
      getUserInformation : getUserInformation
    };
});
