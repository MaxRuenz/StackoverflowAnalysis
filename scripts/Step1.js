define(['d3'], function(d3){

    function initializePage(){
      console.log("Hi");
      d3.select("#SubmitUserID").on('click', function() {
        let userID = d3.select('#InputUserID').node().value
        d3.json('user.json?id=' + userID, function() {
          // TODO fill table
        });
      });
    }

    return {
      initializePage: initializePage
    };
});
