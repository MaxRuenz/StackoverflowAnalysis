define(['d3'], function(d3){

    let userInformation;

    function initializePage(){
      console.log("Hi");
      d3.select("#SubmitUserID").on('click', function() {
        let userID = d3.select('#InputUserID').node().value
        d3.json('data/users/' + userID +'.json', function(data) {
          console.log(data);
          userInformation = data;
        });
      });
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
