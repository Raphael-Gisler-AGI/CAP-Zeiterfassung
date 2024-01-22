const cds = require("@sap/cds");

class AdminService extends cds.ApplicationService {
  async init() {
    this.project = await cds.connect.to("API_PROJECT_V3");
    const { Categories, WBSElements, Projects } = this.entities;

    this.before("READ", Categories, async (req) => {
      return await super.init();
    });

    this.on("READ", WBSElements, async (req) => {
      return await this.project.run(req.query);
    });

    this.on("READ", Projects, async (req) => {
      return await this.project.run(req.query);
    });

    return await super.init();
  }
}

module.exports = AdminService;
