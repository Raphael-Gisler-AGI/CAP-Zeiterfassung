sap.ui.define(["./BaseController"], function (BaseController) {
  "use strict";

  return BaseController.extend(
    "userzeiterfassung.ext.main.controller.Calendar",
    {
      _detailsPopover: undefined,

      onCreate(oEvent) {
        const startTime = oEvent.getParameter("startDate");
        const endTime = oEvent.getParameter("endDate");
        this.createEntry({ startTime: startTime, endTime: endTime });
      },

      async onSelect(oEvent) {
        const appointment = oEvent.getParameter("appointment");

        if (!appointment) {
          return;
        }

        const appointmentContext = appointment.getBindingContext();

        this._detailsPopover ??= await this.getExtensionAPI().loadFragment({
          name: "userzeiterfassung.ext.main.fragment.Detail",
          initialBindingContext: appointmentContext,
          controller: this,
        });

        this._detailsPopover.bindElement(appointmentContext.getPath());

        this._detailsPopover.openBy(appointment);
      },

      onPressDetailDelete(oEvent) {
        const entryContext = oEvent.getSource().getBindingContext();
        this.openEntryDeleteDialog(entryContext);
      },
    }
  );
});
