sap.ui.define(["./BaseController"], function (BaseController) {
  "use strict";

  return BaseController.extend("zeiterfassung.controller.Main", {
    async onOpenCreateEntryDialog() {
      const tableItems = this.byId("entriesTable").getBinding("items");
      this.getView().setBusy(true);
      const result = tableItems.create({
        description: "",
        category_ID: undefined,
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
    onCloseDialog() {
      this.byId("entryDialog").close();
    },
    async onPressSaveEntry(oEvent) {
      const context = oEvent.getSource().getBindingContext();
      await this.getOwnerComponent()
        .getModel()
        .bindContext(
          `/Entries(ID=${context.getProperty(
            "ID"
          )},IsActiveEntity=false)/AdminService.draftActivate(...)`,
          context
        )
        .execute();
      this.onCloseDialog();
      this.refresh();
    },
  });
});
