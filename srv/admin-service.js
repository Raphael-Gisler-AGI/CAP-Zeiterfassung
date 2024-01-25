const cds = require("@sap/cds");

class AdminService extends cds.ApplicationService {
  async init() {
    this.project = await cds.connect.to("API_PROJECT_V3");
    const { WBSElements, Projects } = this.entities;

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
