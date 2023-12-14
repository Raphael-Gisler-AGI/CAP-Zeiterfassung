sap.ui.define(["./BaseController"], function (BaseController) {
  "use strict";

  return BaseController.extend("adminzeiterfassung.controller.Project", {
    onInit() {
      this.getRouter()
        .getRoute("RouteProject")
        .attachPatternMatched(this._onObjectMatched, this);
    },
    _onObjectMatched(oEvent) {
      const id = oEvent.getParameter("arguments").id;
      this.getView().bindElement(`/Categories(ID=${id})`);
    },
    onPressEditProject(oEvent) {
      this.editProject(oEvent.getSource().getBindingContext());
    },
    onPressDeleteProject(oEvent) {
      this.deleteProject(oEvent.getSource().getBindingContext());
    },
  });
});
