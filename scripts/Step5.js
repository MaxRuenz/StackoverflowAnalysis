define(['d3', 'charts/ParrallelCordinates'], function(d3, ParrallelCordinates) {

  function initializePage() {
    console.log("Hi");

    const element = "#div-cordinates";
    const bounds = d3.select(element).node().getBoundingClientRect(),
      margins = {
        top: 30,
        right: 10,
        bottom: 10,
        left: 50
      }
    widthPC = bounds.width - margins.left - margins.right,
      heightPC = bounds.height - margins.top - margins.bottom;

    d3.csv('data/users.csv', function(error, data) {
      pC = new ParrallelCordinates({
        element: element,
        height: heightPC,
        width: widthPC,
        margins: margins,
        data: data
      });
    });
  }

  return {
    initializePage: initializePage
  };
});
