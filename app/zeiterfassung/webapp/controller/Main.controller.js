sap.ui.define(["./BaseController"], function (BaseController) {
  "use strict";

  return BaseController.extend("zeiterfassung.controller.Main", {
    onPressEdit(oEvent) {
      this.openEntryDialog(oEvent.getSource().getBindingContext());
    },
    onPressDelete(oEvent) {
      oEvent.getSource().getBindingContext().delete();
    },
  });
});
