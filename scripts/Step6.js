define(['d3', 'charts/StreamGraph'], function(d3, StreamGraph) {

  const margins = {
      top: 30,
      right: 10,
      bottom: 10,
      left: 50
    },
    element = "#div-stream",
    colorMap = {
      "Questions Super Users": '#fee5d9',
      "Questions Frequent Users": '#fcae91',
      "Questions Active Users": '#fb6a4a',
      "Questions One Time Users": '#de2d26',
      "Questions Inactive Users": '#a50f15',
      "Answers Inactive Users": '#08519c',
      "Answers One Time User": '#3182bd',
      "Answers Active Users": '#6baed6',
      "Answers Frequent Users": '#bdd7e7',
      "Answers Super Users": '#eff3ff'
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
          colorMap: colorMap,
          legend: true
        });
      }
    });
  }

  return {
    initializePage: initializePage
  };
});
