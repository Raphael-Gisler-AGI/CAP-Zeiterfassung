sap.ui.define(
  ["./BaseController", "sap/ui/model/Filter", "sap/ui/model/FilterOperator"],
  function (BaseController, Filter, FilterOperator) {
    "use strict";

    return BaseController.extend("zeiterfassung.controller.Main", {
      onInit: function () {
        const list = this.byId("entriesTable");
        const filters = [
          new Filter("SiblingEntity/IsActiveEntity", FilterOperator.EQ, null),
          new Filter("IsActiveEntity", FilterOperator.EQ, false),
        ];
        list.bindItems({
          path: "/Entries",
          template: this.byId("entriesItemTemplate"),
          filters: new Filter({
            filters: filters,
            and: false,
          }),
        });
      },
      async onPressEditEntry(oEvent) {
        const context = oEvent.getSource().getBindingContext();
        const isActiveEntity = context.getProperty("IsActiveEntity");
        if (isActiveEntity) {
          await this.getOwnerComponent()
            .getModel()
            .bindContext(
              `/Entries(ID=${context.getProperty("ID")},IsActiveEntity=true)/AdminService.draftEdit(...)`,
              context
            )
            .execute();
        }
        this.onOpenEntryDialog(context);
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
  }
);
