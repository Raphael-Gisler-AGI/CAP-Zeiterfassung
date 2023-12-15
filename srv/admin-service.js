const cds = require("@sap/cds");

class AdminService extends cds.ApplicationService {
  async init() {
    const { Categories } = this.entities;
    this.before("UPDATE", Categories, (req) => {});
    return super.init();
  }
}

module.exports = AdminService;
