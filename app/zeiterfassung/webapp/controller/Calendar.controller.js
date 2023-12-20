sap.ui.define(["./BaseController"], function (BaseController) {
  "use strict";

  return BaseController.extend("zeiterfassung.controller.Calendar", {
    async onResize(oEvent) {
      const { startDate, endDate, appointment } = oEvent.getParameters();
      await appointment.setStartDate(startDate);
      await appointment.setEndDate(endDate);
    },
  });
});
