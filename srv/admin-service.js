const cds = require("@sap/cds");

function AdminService() {
  this.on("createProject", async ({ data }) => {
    console.log(JSON.parse(data));
  });
}

module.exports = AdminService;
