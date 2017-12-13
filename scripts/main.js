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
    Step1.initializePage();

    let currentUserInfo;

    $('#myCarousel').on('slid.bs.carousel', function(event) {
      displayArrows();
      let pageFrom = event.from;
      let pageTo = event.to;
      if (pageFrom === 1) {
        currentUserInfo = Step1.getUserInformation();
        Step2.initializePage(currentUserInfo);
        Step3.initializePage(currentUserInfo);
        Step4.initializePage(currentUserInfo);
        Step7.initializePage(currentUserInfo);
      }
      if (pageTo == 5){
        Step5.initializePage(currentUserInfo);
      } else if (pageTo == 6){
        Step6.initializePage(currentUserInfo);
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
