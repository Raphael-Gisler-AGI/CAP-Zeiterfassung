sap.ui.define(["sap/fe/core/rootView/NavContainer.controller"], function (
  NavigationController
) {
  "use strict";

  return NavigationController.extend(
    "userzeiterfassung.ext.main.controller.Root",
    {
      onInit() {
        const sidebar = this.byId("sideNavigation");
        this._getRouter().attachRouteMatched((oEvent) => {
          const route = oEvent.getParameter("name");
          sidebar.setSelectedKey(route);
        });
      },
      onSelectNavigate(oEvent) {
        const route = oEvent.getParameter("item").getKey();
        this._getRouter().navTo(route);
      },

      _getRouter() {
        return this.getAppComponent().getRouter();
      },
    }
  );
});
