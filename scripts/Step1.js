define(['d3'], function(d3){

    /**
     * JS Code for Step You
     */

    let userInformation;
    const tableElement = '#table-user'

    /**
     *
     */
    function initializePage(){
      console.log("Hi");
      d3.select("#SubmitUserID").on('click', fetchUser);
      d3.select("#InputUserID").on('keydown', function (event){
        if (d3.event.keyCode === 13){
            fetchUser();
        }
      })
    }

    /**
     * Creates a table containing the user information
     */
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

    /**
     * Returns the user information in order to be accessed by other pages
     */
    function getUserInformation(){
      console.log(userInformation);
      return userInformation;
    }

    function fetchUser() {
      let userID = d3.select('#InputUserID').node().value
      d3.json('data/users/' + userID +'.json', function(data) {
        console.log(data);
        if (data === null){
          console.log("User not found!")
          console.log(d3.select('#userFetchError'));
          d3.select('#userFetchError').style("display", 'inline');
        } else {
          d3.select('#userFetchError').style("display", 'none');
        }
        userInformation = data;

        let tableData = [];
        tableData.push({"Column": "Name", "Value": userInformation.DisplayName});
        tableData.push({"Column": "Reputation", "Value": userInformation.Reputation});
        tableData.push({"Column": "Questions", "Value": userInformation.data[9]["qcnt"]});
        tableData.push({"Column": "Average Question Votes", "Value": userInformation.data[9]["qvotes"]});
        //tableData.push({"Column": "Avg. Question Votes", "Value": userInformation.data[9]["qcnt"]});
        tableData.push({"Column": "Answers", "Value": userInformation.data[9]["acnt"]});
        tableData.push({"Column": "Average Answer Votes", "Value": userInformation.data[9]["avotes"]});
        //tableData.push({"Column": "Avg. Answer Votes", "Value": userInformation.data[9]["qcnt"]});
        tableData.push({"Column": "Votes", "Value": userInformation.data[9]["votes"]});

        createTable(tableData);
      });
    }

    return {
      initializePage: initializePage,
      getUserInformation : getUserInformation
    };
});
