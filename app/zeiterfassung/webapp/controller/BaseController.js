sap.ui.define(["sap/ui/core/mvc/Controller"], function (Controller) {
  "use strict";

  return Controller.extend("zeiterfassung.controller.BaseController", {
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
    async saveEntry(context) {
      await this.getModel()
        .bindContext(
          `${context.getPath()}/UserService.draftActivate(...)`,
          context
        )
        .execute();
      this._refresh();
    },
  });
});
