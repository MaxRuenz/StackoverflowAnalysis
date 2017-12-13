require(['Step0', 'Step1', 'Step2', 'Step3', 'Step4', 'Step5', 'Step6', 'Step7', 'Step8',
  'chart', 'bootstrap', 'bootstrapSlider'
], function(Step0, Step1, Step2, Step3, Step4, Step5, Step6, Step7, Step8, Chart) {

  $(function() {
    // Wait until HTML is loaded

    // Carousel is from bootstrap and only working with jQuery
    $('#myCarousel').carousel({
      interval: false,
      wrap: false
    });

    displayArrows();
    Step0.initializePage();

    $('#myCarousel').on('slid.bs.carousel', function(event) {
      displayArrows();
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
      }
    });
  });

  function displayArrows() {
    let carousel = $('#myCarousel');
    if ($('.carousel-inner .carousel-item:first').hasClass('active')) {
      carousel.children('.carousel-control-prev').hide();
      carousel.children('.carousel-control-next').show();
    } else if ($('.carousel-inner .carousel-item:last').hasClass('active')) {
      carousel.children('.carousel-control-prev').show();
      carousel.children('.carousel-control-next').hide();
    } else {
      carousel.children('.carousel-control-prev').show();
      carousel.children('.carousel-control-next').show();
    }
  }

});
