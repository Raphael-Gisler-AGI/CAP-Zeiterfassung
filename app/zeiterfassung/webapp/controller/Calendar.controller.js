sap.ui.define(["./BaseController"], function (BaseController) {
  "use strict";

  return BaseController.extend("zeiterfassung.controller.Calendar", {
    async onInit() {
      this.detailsPopover ??= await this.loadFragment({
        name: "zeiterfassung.fragment.Details",
      });
    },
    _changeRange(entry, startDate, endDate) {
      entry.setStartDate(startDate);
      entry.setEndDate(endDate);
    },
    onResize(oEvent) {
      const { appointment, startDate, endDate } = oEvent.getParameters();
      this._changeRange(appointment, startDate, endDate);
    },
    async onCreate(oEvent) {
      const { startDate, endDate } = oEvent.getParameters();
      await this.createEntry({ startTime: startDate, endTime: endDate });
      this.refresh();
    },
    async onDrop(oEvent) {
      const { appointment, startDate, endDate, copy } = oEvent.getParameters();
      if (copy) {
        const entry = appointment.getBindingContext().getObject();
        delete entry.ID;
        entry.startTime = startDate;
        entry.endTime = endDate;
        await this.createEntry(entry);
        this.refresh();
      } else {
        this._changeRange(appointment, startDate, endDate);
      }
    },

    // Details Fragment
    onSelect(oEvent) {
      const selectedEntry = oEvent.getParameter("appointment");
      if (!selectedEntry) {
        return;
      }
      this.detailsPopover.bindElement(
        selectedEntry.getBindingContext().getPath()
      );
      this.detailsPopover.openBy(selectedEntry);
    },
  });
});
