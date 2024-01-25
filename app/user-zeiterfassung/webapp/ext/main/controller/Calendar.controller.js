sap.ui.define(["./BaseController"], function (BaseController) {
  "use strict";

  return BaseController.extend(
    "userzeiterfassung.ext.main.controller.Calendar",
    {
      _detailsPopover: undefined,
      async onSelect(oEvent) {
        this._detailsPopover ??= await this.loadFragment({
          name: "userzeiterfassung.ext.main.fragment.Detail",
        });
        const appointment = oEvent.getParameter("appointment");

        this._detailsPopover.bindElement(
          appointment.getBindingContext().getPath()
        );
        this._detailsPopover.openBy(appointment);
      },
    }
  );
});
