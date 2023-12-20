const cds = require("@sap/cds");

class UserService extends cds.ApplicationService {
  async init() {
    const { Entries } = this.entities;
    this.on("getEntriesDrafts", async () => {
      return await SELECT.from(Entries.drafts);
    })
    return super.init();
  }
}

module.exports = UserService
