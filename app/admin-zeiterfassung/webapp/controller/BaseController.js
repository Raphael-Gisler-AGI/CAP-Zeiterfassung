sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "../model/formatter",
    "sap/m/MessageBox",
    "sap/ui/core/routing/History",
  ],
  function (Controller, formatter, MessageBox, History) {
    "use strict";

    return Controller.extend("adminzeiterfassung.controller.BaseController", {
      formatter: formatter,
      /**
       *
       * @param {object} [name]
       * @returns {object}
       */
      getModel(name = undefined) {
        return this.getOwnerComponent().getModel(name);
      },
      refresh() {
        this.getModel().refresh();
      },
      getText(text) {
        return this.getModel("i18n").getResourceBundle().getText(text);
      },
      // Navigation
      getRouter() {
        return this.getOwnerComponent().getRouter();
      },
      navBack() {
        const previousHash = History.getInstance().getPreviousHash();
        if (previousHash) {
          window.history.go(-1);
        } else {
          this.navToMain();
        }
      },
      navToMain() {
        this.getRouter().navTo("RouteMain");
      },
      navToProject(id) {
        this.getRouter().navTo("RouteProject", { id: id });
      },
      navToNotFound() {
        this.getRouter().navTo("RouteNotFound", {}, {}, true)
      },
      /**
       *
       * @param {string} [id]
       */
      navToManageProject(id = undefined) {
        this.getRouter().navTo("RouteManageProject", { id: id });
      },
      async saveProject(context) {
        const id = context.getProperty("ID");
        await this.getModel()
          .bindContext(
            `/Categories(ID=${id},IsActiveEntity=false)/AdminService.draftActivate(...)`,
            context
          )
          .execute();
        this.navToProject(id);
      },
      async editProject(context) {
        const id = context.getProperty("ID");
        await this.getModel()
          .bindContext(
            `/Categories(ID=${id},IsActiveEntity=true)/AdminService.draftEdit(...)`,
            context
          )
          .execute();
        this.navToManageProject(id);
      },
      async deleteProject(context) {
        MessageBox.confirm(this.getText("projectDeleteMessage"), {
          title: this.getText("projectDeleteTitle"),
          onClose: async (oEvent) => {
            if (oEvent === MessageBox.Action.OK) {
              await context.delete();
              this.refresh();
              this.navToMain();
            }
          },
        });
      },
    });
  }
);
