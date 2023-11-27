sap.ui.define(["sap/ui/core/mvc/Controller"], function (Controller) {
  "use strict";

  return Controller.extend("zeiterfassung.controller.Main", {
    async onOpenCreateEntryDialog() {
      const tableItems = this.byId("entriesTable").getBinding("items");
      this.getView().setBusy(true);
      const result = tableItems.create({
        description: "test",
        category: 1,
        startTime: new Date(),
        endTime: new Date(),
      });
      await result.created();
      this.getView().setBusy(false);

      if (!this.entriesDialog) {
        this.entriesDialog = this.loadFragment({
          name: "zeiterfassung.fragment.Entry",
        });
      }
      this.entriesDialog.then((dialog) => {
        dialog.bindElement(result.getPath());
        dialog.open();
      });
    },
  });
});
