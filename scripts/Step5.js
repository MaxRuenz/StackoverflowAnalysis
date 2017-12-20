define(['d3', 'charts/ParrallelCordinates'], function(d3, ParrallelCordinates) {

  const element = "#div-cordinates",
    margins = {
      top: 30,
      right: 60,
      bottom: 10,
      left: 70
    };

  let pC;


  function initializePage(currentUserInfo) {
    console.log("Hi");

    let user = {};
    if (typeof currentUserInfo !== 'undefined'){
      user["Reputation"] = currentUserInfo.Reputation;
      user["Question Votes"] = currentUserInfo.data[9]["qvotes"]+"";
      user["Answer Votes"] = currentUserInfo.data[9]["avotes"]+"";
      user["Votes"] = currentUserInfo.data[9]["votes"]+"";
      user["Question Count"] = currentUserInfo.data[9]["qcnt"]+"";
      user["Answer Count"] = currentUserInfo.data[9]["acnt"]+"";
      user["Class"] = currentUserInfo.Class+"";
      if (!Object.values(user).every(function(e){return e>0})){
        user = undefined;
      }
      console.log(user);
    }

    const bounds = d3.select(element).node().getBoundingClientRect(),

      widthPC = bounds.width - margins.left - margins.right,
      heightPC = bounds.height - margins.top - margins.bottom;

    d3.csv('data/users_edited_sample.csv', function(error, data) {
      if (pC) {
        pC.update(data);
      } else {
        console.log(data);
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
