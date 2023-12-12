sap.ui.define(["./BaseController"], function (BaseController) {
  "use strict";

  return BaseController.extend("zeiterfassung.controller.App", {
    async onPressCreateEntry() {
      const entries = this.getModel().bindList("/Entries");
      const result = entries.create();
      this.getView().setBusy(true);
      await result.created();
      this.getView().setBusy(false);
      this._openEntryDialog(result);
    },

    // Dialog
    async onPressCreateEntryDialog() {
      const context = this._getEntryDialog().getBindingContext();
      await this.saveEntry(context);
      this._closeEntryDialog();
    },
    onPressCancelEntryDialog() {
      this._getEntryDialog().getBindingContext().delete();
      this._closeEntryDialog();
    },

    _openEntryDialog(context) {
      this.entryDialog ??= this.loadFragment({
        name: "zeiterfassung.fragment.Entry",
      });
      this.entryDialog.then((dialog) => {
        dialog.bindElement(context.getPath());
        dialog.open();
      });
    },
    _getEntryDialog() {
      return this.byId("entryDialog");
    },
    _closeEntryDialog() {
      this._getEntryDialog().close();
    },
  });
});
