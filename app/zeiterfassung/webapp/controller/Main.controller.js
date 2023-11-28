sap.ui.define(["./BaseController", "sap/ui/model/Filter",
	"sap/m/MessageBox"], function (
  BaseController,
	Filter,
	MessageBox
) {
  "use strict";

  return BaseController.extend("zeiterfassung.controller.Main", {
    onInit() {
      this.byId("entriesTable").bindItems({
        path: "/Entries",
        template: this.byId("entriesItemTemplate"),
        filters: new Filter({
          filters: this.getDraftFilters(),
          and: false,
        }),
      });
    },
    async onPressEditEntry(oEvent) {
      const context = oEvent.getSource().getBindingContext();
      if (context.getProperty("IsActiveEntity")) {
        await this.getOwnerComponent()
          .getModel()
          .bindContext(
            `/Entries(ID=${context.getProperty(
              "ID"
            )},IsActiveEntity=true)/AdminService.draftEdit(...)`,
            context
          )
          .execute();
      }
      this.onOpenEntryDialog(context);
    },
    onPressDeleteEntry(oEvent) {
      MessageBox.confirm("Are you sure you want to delete this entry?", {
        title: "Delete",
        onClose: async (response) => {
          if (response === "OK") {
            await oEvent.getSource().getBindingContext().delete();
            this.refresh();
          }
        },
      });
    },
    async onPressCreateEntry() {
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
      this.onOpenEntryDialog(result);
    },
    onOpenEntryDialog(context) {
      if (!this.entriesDialog) {
        this.entriesDialog = this.loadFragment({
          name: "zeiterfassung.fragment.Entry",
        });
      }
      this.entriesDialog.then((dialog) => {
        dialog.bindElement(context.getPath());
        dialog.open();
      });
    },
    onCloseDialog() {
      this.byId("entryDialog").close();
    },
    async onPressSaveEntry() {
      this.onCloseDialog();
      this.refresh();
    },
  });
});
