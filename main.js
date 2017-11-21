$(function() {
  // Wait until HTML is loaded

  $('#slider-time').slider({
    formatter: function(value) {
      return 'Current value: ' + value;
    }
  });
  $("#slider-time").on("slide", function(slideEvt) {
    $("#time-current").text(slideEvt.value);
  });

  $('#slider-vote').slider({
    formatter: function(value) {
      return 'Current value: ' + value;
    }
  });
  $("#slider-vote").on("slide", function(slideEvt) {
    $("#vote-current").text(slideEvt.value);
  });

});
