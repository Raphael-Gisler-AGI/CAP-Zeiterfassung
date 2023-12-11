sap.ui.define(["./BaseController", "sap/ui/model/json/JSONModel"], function (
  BaseController,
  JSONModel
) {
  "use strict";

  return BaseController.extend("zeiterfassung.controller.App", {
    onInit() {
      this.getView().setModel(new JSONModel(), "EntryDialog");
    },
    onPressCreateEntry() {
      this._openEntryDialog();
    },
    // Dialog
    async onPressCreateEntryDialog() {
      const entries = this.getModel().bindList("/Entries");
      const result = entries.create(this.getEntryDialogModel().getData());
      this.getView().setBusy(true);
      await result.created();
      this.getView().setBusy(false);
      this._closeEntryDialog();
    },
    onPressCancelEntryDialog() {
      this._closeEntryDialog();
    },
    _openEntryDialog() {
      this.getEntryDialogModel().setData({
        description: "",
        category_ID: "",
        startTime: new Date(),
        endTime: new Date(),
        isAllDay: false,
        tickets_ID: undefined,
      });
      this.entryDialog ??= this.loadFragment({
        name: "zeiterfassung.fragment.Entry",
      });
      this.entryDialog.then((dialog) => {
        dialog.open();
      });
    },
    _closeEntryDialog() {
      this.getEntryDialogModel().setData({});
      this.byId("entryDialog").close();
    },
  });
});
