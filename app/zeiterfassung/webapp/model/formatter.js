sap.ui.define([], function () {
  "use strict";

  return {
    getEntryGroup(entry) {
      return new Date(entry.getProperty("startTime")).toLocaleDateString();
    },
    getEntryTime(startTime, endTime) {
      if (!startTime || !endTime) {
        return "No Date";
      }
      const getTime = (date) =>
        date.split(" ")[1].split(":").slice(0, 2).join(":");
      return `${getTime(startTime)} - ${getTime(endTime)}`;
    },
    getEntryStatus(status) {
      if (status > 0) {
        return "Success";
      }
      if (status < 0) {
        return "Error";
      }
      return "Information";
    },
  };
});
