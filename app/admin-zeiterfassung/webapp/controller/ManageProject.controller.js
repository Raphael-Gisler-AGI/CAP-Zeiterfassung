sap.ui.define(["./BaseController"], function (BaseController) {
  "use strict";

  return BaseController.extend("adminzeiterfassung.controller.ManageProject", {
    onInit() {
      this.getRouter()
        .getRoute("RouteManageProject")
        .attachPatternMatched(this._onObjectMatched, this);
    },
    _onObjectMatched(oEvent) {
      const { id } = oEvent.getParameter("arguments");
      this.getView().bindObject({
        path: `/Categories(ID=${id},IsActiveEntity=false)`,
        events: {
          dataReceived: (oEvent) => {
            if (oEvent.getParameter("error")) {
              this.navToNotFound();
            }
          },
        },
      });
    },
    onPressDiscard() {
      this.deleteProject(this.getView().getBindingContext());
    },
    onPressSave() {
      this.saveProject(this.getView().getBindingContext());
    },
  });
});
