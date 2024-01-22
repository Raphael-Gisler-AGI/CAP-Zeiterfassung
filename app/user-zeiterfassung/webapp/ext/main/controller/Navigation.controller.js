sap.ui.define(["sap/fe/core/rootView/NavContainer.controller"], function (
  NavigationController
) {
  "use strict";

  return NavigationController.extend("userzeiterfassung.ext.main.Navigation", {
    onInit() {
      const sideNavigation = this.byId("sideNavigation");
      const router = this._getRouter();
      router.attachRouteMatched((oEvent) => {
        const routeName = oEvent.getParameter("name");
        sideNavigation.setSelectedKey(routeName);
      });
    },
    onSelectNavigate(oEvent) {
      const router = this._getRouter();
      const route = oEvent.getParameter("item").getKey();
      router.navTo(route);
    },

    _getRouter() {
      return this.getAppComponent().getRouter();
    },
  });
});
