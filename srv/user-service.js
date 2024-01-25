const cds = require("@sap/cds");

class UserService extends cds.ApplicationService {
  async init() {
    this.project = await cds.connect.to("API_PROJECT_V3");

    const { Entries, Projects } = this.entities;

    this.on("READ", Entries, async (req, next) => {
      return await this._handleExpand(req, next, Projects, "to_project", "ID");
    });

    this.on("READ", Projects, async (req) => {
      return await this.project.run(req.query);
    });

    return await super.init();
  }
  
  async _handleExpand(req, next, expandedEntity, associationName, keyName) {
    const columns = req.query.SELECT.columns;

    if (!columns) return next();

    const expandedIndex = columns.findIndex(
      ({ expand, ref }) => expand && ref[0] === associationName
    );

    if (expandedIndex < 0) return next();

    const expandColumns = columns[expandedIndex].expand;

    const id = associationName.concat("_", keyName);

    this._addId(columns, id);

    this._addId(expandColumns, keyName);

    let entries = await next();

    if (!Array.isArray(entries)) {
      entries = [entries];
    }

    const projectIDs = [...new Set(entries.map((entry) => entry[id]))].filter(
      (projectID) => projectID !== undefined
    );

    if (projectIDs.length <= 0) {
      return await next();
    }

    const projects = await this.project.run(
      SELECT(expandColumns).from(expandedEntity).where({ ID: projectIDs })
    );

    const mProjects = new Map(projects.map((project) => [project.ID, project]));

    entries.forEach((entry) => {
      entry.to_project = mProjects.get(entry[id]);
      delete entry[id];
    });
  }
  _addId(columns, id) {
    const allSelected = columns.indexOf("*") !== -1;
    const idSelected = columns.find(
      (column) => column.ref && column.ref.find((ref) => ref == id)
    );

    if (!allSelected && !idSelected) {
      columns.push({ ref: [id] });
    }
  }
}

module.exports = UserService;
