sap.ui.define(["sap/ui/core/mvc/Controller"], function (Controller) {
  "use strict";

  return Controller.extend("zeiterfassung.controller.BaseController", {
    /**
     *
     * @param {string} [name]
     * @returns {object}
     */
    getModel(name) {
      return this.getOwnerComponent().getModel(name);
    },
    getEntriesModel() {
      return this.getModel("Entries");
    },
    getEntryDialogModel() {
      return this.getView().getModel("EntryDialog");
    },
  });
});
