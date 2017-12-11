define(['d3', 'charts/StreamGraph'], function(d3, StreamGraph) {

  const margins = {
      top: 30,
      right: 10,
      bottom: 10,
      left: 50
    },
    element = "#div-stream",
    colorMap = {
      "Questions": '#ff0000',
      "Answers": '#0000ff'
    };

  let sG;

  function initializePage() {
    console.log("Hi");

    const bounds = d3.select('#div-stream').node().getBoundingClientRect(),
      widthSC = bounds.width - margins.left - margins.right,
      heightSC = bounds.height - margins.top - margins.bottom;

    d3.json("data/aq_time.json", function(data) {
      if (sG) {
        sG.update(data);
      } else {
        sG = new StreamGraph({
          element: element,
          height: heightSC,
          width: widthSC,
          margins: margins,
          data: data,
          colorMap: colorMap
        });
      }
    });
  }

  return {
    initializePage: initializePage
  };
});
