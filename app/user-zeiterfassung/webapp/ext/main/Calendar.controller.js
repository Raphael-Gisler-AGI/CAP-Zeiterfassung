sap.ui.define(["./BaseController"], function (BaseController) {
  "use strict";

  return BaseController.extend("userzeiterfassung.ext.main.Calendar", {
    onInit() {
      console.log("testing");
      console.log(this.test());
    },
  });
});
