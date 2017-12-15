define(['d3', 'charts/StreamGraph'], function(d3, StreamGraph) {

  const margins = {
      top: 30,
      right: 10,
      bottom: 10,
      left: 50
    },
    element = "#div-stream",
    colorMap = {
      "Questions Class 4": '#fee5d9',
      "Questions Class 3": '#fcae91',
      "Questions Class 2": '#fb6a4a',
      "Questions Class 1": '#de2d26',
      "Questions Class 0": '#a50f15',
      "Answers Class 0": '#08519c',
      "Answers Class 1": '#3182bd',
      "Answers Class 2": '#6baed6',
      "Answers Class 3": '#bdd7e7',
      "Answers Class 4": '#eff3ff'
    };

  let sG;

  function initializePage(currentUserInfo) {
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
