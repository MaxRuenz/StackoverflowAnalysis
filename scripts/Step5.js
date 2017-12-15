define(['d3', 'charts/ParrallelCordinates'], function(d3, ParrallelCordinates) {

  const element = "#div-cordinates",
    margins = {
      top: 30,
      right: 10,
      bottom: 10,
      left: 50
    };

  let pC;


  function initializePage(currentUserInfo) {
    console.log("Hi");

    let user = {}
    user["Reputation"] = currentUserInfo.Reputation;
    user["qvotes"] = currentUserInfo.data[9]["qvotes"]+"";
    user["avotes"] = currentUserInfo.data[9]["avotes"]+"";
    user["votes"] = currentUserInfo.data[9]["votes"]+"";
    user["qcnt"] = currentUserInfo.data[9]["qcnt"]+"";
    user["acnt"] = currentUserInfo.data[9]["acnt"]+"";
    user["Class"] = currentUserInfo.Class+"";

    const bounds = d3.select(element).node().getBoundingClientRect(),

      widthPC = bounds.width - margins.left - margins.right,
      heightPC = bounds.height - margins.top - margins.bottom;

    d3.csv('data/users_edited_sample.csv', function(error, data) {
      if (pC) {
        pC.update(data);
      } else {
        console.log(data);
        console.log(user);
        pC = new ParrallelCordinates({
          element: element,
          height: heightPC,
          width: widthPC,
          margins: margins,
          data: data,
          user: user
        });
      }
    });
  }

  return {
    initializePage: initializePage
  };
});
