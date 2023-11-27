sap.ui.define(["sap/ui/core/mvc/Controller"], function (Controller) {
  "use strict";

  return Controller.extend("zeiterfassung.controller.BaseController", {
    /**
     *
     * @param {string} [modelName]
     * @returns {object}
     */
    getModel(modelName = undefined) {
      return this.getOwnerComponent().getModel(modelName);
    },
    refresh() {
      this.getModel().refresh();
    },
  });
});
