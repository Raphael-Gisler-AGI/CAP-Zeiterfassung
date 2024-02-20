sap.ui.define(["./BaseController"], function (BaseController) {
  "use strict";

  return BaseController.extend("userzeiterfassung.ext.main.controller.Main", {
    onPressCreateEntry() {
      this.openCreateEntryDialog();
    },
    onPressDeleteEntries() {
      const selectedContexts = this.byId("LineItemTable").getSelectedContexts();
      this.openEntryDeleteDialog(selectedContexts);
    },
  });
});
