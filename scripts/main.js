require(['Step0', 'Step1', 'Step2', 'Step3', 'Step4', 'Step5', 'Step6', 'Step7', 'Step8',
  'chart', 'bootstrap', 'bootstrapSlider'], function(Step0, Step1, Step2, Step3, Step4, Step5, Step6, Step7, Step8, Chart) {

  $(function() {
    // Wait until HTML is loaded

    $('#myCarousel').carousel({
      interval: false,
      wrap: false
    });

    Step0.initializePage();

    $('#myCarousel').on('slid.bs.carousel', function(event) {
      let page = event.to;
      if (page === 1) {
        Step1.initializePage();
      } else if (page === 2) {
        Step2.initializePage();
      } else if (page === 3) {
        Step3.initializePage();
      } else if (page === 4) {
        Step4.initializePage();
      } else if (page === 5) {
        Step5.initializePage();
      } else if (page === 6) {
        Step6.initializePage();
      } else if (page === 7) {
        Step7.initializePage();
      } else if (page === 8) {
        Step8.initializePage();
      }
    });
  });
});
