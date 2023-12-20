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
		_refresh() {
			this.getModel().refresh();
		},
		async _saveEntry(entry) {
			await this.getModel()
				.bindContext(`${entry.getPath()}/UserService.draftActivate(...)`)
				.execute();
			this._refresh();
		},
		async editEntry(entry) {
			const id = entry.getProperty("ID");
			await this.getModel()
				.bindContext(`${entry.getPath()}/UserService.draftEdit(...)`)
				.execute();
			return await this.getModel().bindContext(
				`/Entries(ID=${id},IsActiveEntity=false)`
			);
		},
		async deleteEntry(entry) {
			await entry.delete();
		},
		// Entry Dialog
		async onPressSaveEntryDialog(oEvent) {
			const entry = oEvent.getSource().getBindingContext();
			await this._saveEntry(entry);
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
