'use strict';
requirejs.config({
  baseUrl: 'scripts/',
  paths: {
    // shim does not support cdn, so use local libraries when necessary
    d3: "https://cdnjs.cloudflare.com/ajax/libs/d3/4.12.0/d3.min",
    jQuery: "lib/jquery-3.2.1.slim.min",
    popper: "lib/popper.min",
    bootstrap: "lib/bootstrap.min",
    chart: "https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.7.1/Chart.bundle.min",
    bootstrapSlider: "lib/bootstrap-slider.min"
  },
  shim: {
    "jQuery": {exports: '$'},
    "popper" : {deps: ["jQuery"], exports: 'Popper'},
    "bootstrap" : {deps: ["jQuery", "popper"]}
  }
});

require(['jQuery', 'popper'], function ($, Popper){
  // bootstrap requires libraries to be defined on window level
  window.Popper = Popper;
  window.$ = $;

  require(['main']);
});
