sap.ui.define(["./BaseController"], function (BaseController) {
  "use strict";

  return BaseController.extend("zeiterfassung.controller.App", {
    onInit() {
      this.getRouter().attachRouteMatched((oEvent) => {
        const key = oEvent.getParameter("name");
        const navigationList = this.byId("navigationList");
        const isNavigationListItem = navigationList
          .getItems()
          .find((item) => item.getProperty("key") === key);
        navigationList.setSelectedKey(isNavigationListItem ? key : undefined);
      });
    },
    onSelectNavigationItem(oEvent) {
      const key = oEvent.getParameter("item").getProperty("key");
      this.getRouter().navTo(key);
    },
  });
});
