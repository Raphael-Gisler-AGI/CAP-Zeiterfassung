sap.ui.define(["./BaseController"], function (BaseController) {
  "use strict";

  return BaseController.extend("zeiterfassung.controller.Main", {
    async onPressEdit(oEvent) {
      const entry = oEvent.getSource().getBindingContext();
      const draftEntry = await this.editEntry(entry);
      this.openEntryDialog(draftEntry);
    },
    onPressDelete(oEvent) {
      const entry = oEvent.getSource().getBindingContext();
      this.deleteEntry(entry);
    },
  });
});
