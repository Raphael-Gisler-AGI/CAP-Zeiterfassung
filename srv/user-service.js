const cds = require("@sap/cds");

class UserService extends cds.ApplicationService {
  async init() {
    const { Entries } = this.entities;
    this.after(["UPDATE"], Entries, async (req) => {
      const test = "heheha";
    })
    return super.init();
  }
}

module.exports = UserService
