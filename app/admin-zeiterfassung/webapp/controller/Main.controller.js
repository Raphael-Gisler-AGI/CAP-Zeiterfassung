sap.ui.define(["./BaseController"], function (BaseController) {
  "use strict";

  return BaseController.extend("adminzeiterfassung.controller.Main", {
    async onPressCreateProject() {
      const result = this.getModel().bindList("/Categories").create();
      this.getView().setBusy(true);
      await result.created();
      this.getView().setBusy(false);
      this.navToManageProject(result.getProperty("ID"));
    },
    onNavProject(oEvent) {
      this.getRouter().navTo("RouteProject", {
        id: oEvent.getSource().getBindingContext().getProperty("ID"),
      });
    },
    onPressProjectAction(oEvent) {
      const source = oEvent.getSource();
      source.getDependents()[0].openBy(source);
    },
    onPressEditProjectAction(oEvent) {
      this.editProject(oEvent.getSource().getBindingContext());
    },
    onPressDeleteProjectAction(oEvent) {
      this.deleteProject(oEvent.getSource().getBindingContext());
    },
  });
});
