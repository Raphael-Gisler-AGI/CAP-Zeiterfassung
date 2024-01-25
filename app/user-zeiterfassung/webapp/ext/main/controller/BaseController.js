sap.ui.define(["sap/fe/core/PageController", "sap/m/MessageBox"], function (
  PageController,
  MessageBox
) {
  "use strict";

  return PageController.extend(
    "userzeiterfassung.ext.main.controller.BaseController",
    {
      entryDialog: undefined,
      _entryBatchName: "entry",
      /**
       *
       * @param {string} [modelName]
       */
      getModel(modelName = undefined) {
        return this.getAppComponent().getModel(modelName);
      },

      // Entry Delete Dialog
      openEntryDeleteDialog(entryContexts) {
        MessageBox.show("delete?", {
          icon: MessageBox.Icon.WARNING,
          title: "heheheha",
          actions: [MessageBox.Action.DELETE, MessageBox.Action.CANCEL],
          onClose: (response) => {
            if (response === MessageBox.Action.DELETE) {
              entryContexts.forEach((entryContext) => {
                entryContext.delete("deleteEntries");
              });
              this.getModel().submitBatch("deleteEntries");
            }
          },
        });
      },

      // Entry Create Dialog
      openCreateEntryDialog() {
        this.getModel().resetChanges(this._entryBatchName);

        const endDate = new Date();
        const startDate = new Date(new Date().setHours(endDate.getHours() - 1));

        const entryContext = this.getModel()
          .bindList("/Entries", undefined, undefined, undefined, {
            $$updateGroupId: this._entryBatchName,
          })
          .create({
            startTime: startDate,
            endTime: endDate,
          });
        this._openEntryDialog(entryContext);
      },
      openEditEntryDialog() {},

      async _openEntryDialog(entryContext) {
        this.entryDialog ??= await this.loadFragment({
          name: "userzeiterfassung.ext.main.fragment.Entry",
        });

        this.entryDialog.setBindingContext(entryContext);
        this.entryDialog.open();
      },

      onPressSaveEntryDialog() {
        this.getModel().submitBatch(this._entryBatchName);
        this._closeEntryDialog();
      },
      onPressCloseEntryDialog() {
        this.getModel().resetChanges(this._entryBatchName);
        this._closeEntryDialog();
      },

      _closeEntryDialog() {
        const entryDialog = this.byId("entryDialog");
        entryDialog.unbindElement();
        entryDialog.close();
        this.getModel().refresh();
      },
    }
  );
});
