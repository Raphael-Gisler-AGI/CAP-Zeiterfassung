const cds = require("@sap/cds");

// Check for expand
// Check expands to remote service

class UserService extends cds.ApplicationService {
  async init() {
    this.project = await cds.connect.to("API_PROJECT_V3");

    const { Entries, Projects } = this.entities;

    this.on("READ", Entries, async (req, next) => {
      return await this._autoExpand(req, next);
      // return await this._handleExpand(req, next, Projects, "to_project", "ID");
    });

    this.on("READ", Projects, async (req) => {
      return await this.project.run(req.query);
    });

    return await super.init();
  }

  async _expand(data, columns, expandedColumn) {
    const expandColumns = expandedColumn.expand;

    const keyName = expandColumns[0].ref[0];

    // const associationName = expandColumn.ref[0];
    // const id = associationName.concat("_", keyName);

    this._addId(expandColumns, keyName);

    const id = expandedColumn.element.keys[0].$generatedFieldName;

    this._addId(columns, id);

    const projectIDs = [...new Set(data.map((entry) => entry[id]))].filter(
      (projectID) => projectID !== undefined
    );

    if (projectIDs.length <= 0) {
      return data;
    }

    const entityName = expandedColumn.element.target.split(".")[1];
    const expandedEntity = this.entities[entityName];

    const projects = await this.project.run(
      SELECT(expandColumns).from(expandedEntity).where({ ID: projectIDs })
    );

    const mProjects = new Map(projects.map((project) => [project.ID, project]));

    data.forEach((entry) => {
      entry.to_project = mProjects.get(entry[id]);
      delete entry[id];
    });
  }

  _getRemoteObject(definitions, currentEntity, column) {
    const associationName = column.ref[0];
    const association = definitions[currentEntity].associations[associationName];

    // TODO: Test if propper key
    const key = association.keys[0].ref[0];
    const associationKey = association.keys[0].$generatedFieldName;

    const expandEntityName = association.target;
    const entityPath = definitions[expandEntityName].projection.from.ref[0];
    const isFromRemote = definitions[entityPath].query?.source["@cds.external"];

    if (isFromRemote) {
      return {
        associationKey: associationKey,
        key: key,
      };
    }
    return undefined;
  }

  async _autoExpand(req, next) {
    const columns = req.query.SELECT.columns;

    if (!columns) return next();

    const definitions = cds.model.definitions;
    const currentEntity = cds.context.path;

    const remoteObjects = [];

    for (let i = 0; i < columns.length; i++) {
      if (!columns[i].expand) {
        continue;
      }

      const remoteObject = this._getRemoteObject(
        definitions,
        currentEntity,
        columns[i]
      );
      if (remoteObject) {
        remoteObject.index = i;
        remoteObjects.push(remoteObject);
      }
    }

    remoteObjects.forEach((remoteObject) => {
      this._addId(columns, remoteObject.associationKey);
    });

    let entries = await next();

    if (!Array.isArray(entries)) {
      entries = [entries];
    }

    return;
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
