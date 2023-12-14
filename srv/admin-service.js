const cds = require("@sap/cds");

class AdminService extends cds.ApplicationService {
  async init() {
    const { Categories } = this.entities;
    // this.on("UPDATE", Categories, () => {});
    this.on("saveCategory", async (req) => {
      const etse = "afds";
    });
    return super.init();
  }
}

module.exports = AdminService;
