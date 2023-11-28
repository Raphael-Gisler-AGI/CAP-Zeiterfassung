sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
  ],
  function (Controller, Filter, FilterOperator) {
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
      getRouter() {
        return this.getOwnerComponent().getRouter();
      },
      getDraftFilters() {
        return [
          new Filter("SiblingEntity/IsActiveEntity", FilterOperator.EQ, null),
          new Filter("IsActiveEntity", FilterOperator.EQ, false),
        ];
      },
    });
  }
);
