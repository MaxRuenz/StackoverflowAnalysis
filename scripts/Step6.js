define(['d3', 'charts/StreamGraph'], function(d3, StreamGraph) {

  function initializePage() {
    console.log("Hi");
    const margins = {
        top: 30,
        right: 10,
        bottom: 10,
        left: 50
      },
      bounds = d3.select('#div-stream').node().getBoundingClientRect(),
      widthSC = bounds.width - margins.left - margins.right,
      heightSC = bounds.height - margins.top - margins.bottom,
      element = "#div-stream"

    const colorMap = {
      "Questions": '#ff0000',
      "Answers": '#0000ff'
    };

    d3.json("data/QA_time.json", function(data) {
      sG = new StreamGraph({
        element: element,
        height: heightSC,
        width: widthSC,
        margins: margins,
        data: data,
        colorMap,
        colorMap
      });
    });
  }

  return {
    initializePage: initializePage
  };
});
