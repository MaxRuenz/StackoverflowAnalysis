define(['d3', 'charts/ParrallelCordinates'], function(d3, ParrallelCordinates) {

  const element = "#div-cordinates",
    margins = {
      top: 30,
      right: 10,
      bottom: 10,
      left: 50
    };

  let pC;


  function initializePage() {
    console.log("Hi");

    const bounds = d3.select(element).node().getBoundingClientRect(),

      widthPC = bounds.width - margins.left - margins.right,
      heightPC = bounds.height - margins.top - margins.bottom;

    d3.csv('data/users.csv', function(error, data) {
      if (pC) {
        pC.update(data);
      } else {
        pC = new ParrallelCordinates({
          element: element,
          height: heightPC,
          width: widthPC,
          margins: margins,
          data: data
        });
      }
    });
  }

  return {
    initializePage: initializePage
  };
});
