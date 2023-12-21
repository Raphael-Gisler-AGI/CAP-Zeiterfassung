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
    getRouter() {
      return this.getOwnerComponent().getRouter();
    },
    refresh() {
      this.getModel().refresh();
    },
    async _saveEntry(batchName) {
      await this.getModel().submitBatch(batchName);
      this.refresh();
    },
    async createEntry(content) {
      const entries = this.getModel().bindList("/Entries");
      const result = entries.create(content);
      this.getView().setBusy(true);
      await result.created();
      this.getView().setBusy(false);
      return result;
    },
    async deleteEntry(entry) {
      await entry.delete();
    },
    // Entry Dialog
    async onPressSaveEntryDialog(oEvent) {
      const updateGroupId = this._getUpdateGroupId(oEvent)
      await this._saveEntry(updateGroupId);
      this._closeEntryDialog();
    },
    onPressCancelEntryDialog(oEvent) {
      this._closeEntryDialog();
      const updateGroupId = this._getUpdateGroupId(oEvent);
      if (updateGroupId !== "edit") {
        this._getEntryDialog().getBindingContext().delete();
      }
    },
    openEntryDialog(context, isEdit) {
      this.entryDialog ??= this.loadFragment({
        name: "zeiterfassung.fragment.Entry",
      });
      let updateGroupId = "$auto";
      if (isEdit) {
        updateGroupId = "edit";
      }
      this.entryDialog.then((dialog) => {
        dialog.bindElement({
          path: context.getPath(),
          parameters: { $$updateGroupId: updateGroupId },
        });
        dialog.open();
      });
    },
    _getUpdateGroupId(oEvent) {
      return oEvent.getSource().getBindingContext().getUpdateGroupId();
    },
    _getEntryDialog() {
      return this.byId("entryDialog");
    },
    _closeEntryDialog() {
      this._getEntryDialog().close();
    },
  });
});
