sap.ui.define(["sap/ui/core/mvc/Controller", "../model/formatter"], function (
  Controller,
  formatter
) {
  "use strict";

  return Controller.extend("zeiterfassung.controller.BaseController", {
    formatter: formatter,
    /**
     *
     * @param {string} [name]
     * @returns {object}
     */
    getModel(name) {
      return this.getOwnerComponent().getModel(name);
    },
    _refresh() {
      this.getModel().refresh();
    },
    async _saveEntry(batchName) {
      await this.getModel().submitBatch(batchName);
      this._refresh();
    },
    // Entry Dialog
    async onPressSaveEntryDialog() {
      await this._saveEntry("entryGroup");
      this._closeEntryDialog();
    },
    onPressCancelEntryDialog() {
      this._closeEntryDialog();
      this._getEntryDialog().getBindingContext().delete();
    },
    openEntryDialog(context) {
      this.entryDialog ??= this.loadFragment({
        name: "zeiterfassung.fragment.Entry",
      });
      this.entryDialog.then((dialog) => {
        dialog.bindElement({
          path: context.getPath(),
          parameters: { $$updateGroupId: "entryGroup" },
        });
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
