sap.ui.define(["./BaseController"], function (BaseController) {
  "use strict";

  return BaseController.extend("zeiterfassung.controller.App", {
    async onPressCreateEntry() {
      const entries = this.getModel().bindList("/Entries");
      const result = entries.create({
        startTime: new Date(),
        endTime: new Date(),
      });
      this.getView().setBusy(true);
      await result.created();
      this.getView().setBusy(false);
      this.openEntryDialog(result);
    },
  });
});
