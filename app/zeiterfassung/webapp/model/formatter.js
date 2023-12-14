sap.ui.define([], function () {
  "use strict";

  return {
    getEntryGroup(entry) {
      const startTime = new Date(entry.getProperty("startTime"));
      return startTime.toLocaleDateString();
    },
    getEntryTime(startTime, endTime) {
      if (!startTime || !endTime) {
        return "No Date";
      }
      const getTime = (date) => date.split(" ")[1].split(":").slice(0, 2).join(":");
      return `${getTime(startTime)} - ${getTime(endTime)}`;
    },
  };
});
