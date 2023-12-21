sap.ui.define(["./BaseController"], function (BaseController) {
  "use strict";

  return BaseController.extend("zeiterfassung.controller.App", {
    async onInit() {
      this.getRouter().attachRouteMatched((oEvent) => {
        const route = oEvent.getParameter("name");
        this.byId("sideNavigation").setSelectedKey(route);
      });
      this.timerDialog ??= await this.loadFragment({
        name: "zeiterfassung.fragment.Timer",
      });
      // this.draftsPopover ??= await this.loadFragment({
      //     name: "zeiterfassung.fragment.Drafts",
      // });
    },
    onSelectNavigate(oEvent) {
      const route = oEvent.getParameter("item").getKey();
      this.getRouter().navTo(route);
    },
    async onPressCreateEntry() {
      const entry = await this.createEntry({
        startTime: new Date(),
        endTime: new Date(),
      });
      this.openEntryDialog(entry, false);
    },
    async onPressTimer(oEvent) {
      this.timerDialog.openBy(oEvent.getSource());
    },

    // Timer
    onPressTimerToggle() {},
  });
});
