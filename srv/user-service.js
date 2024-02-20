const cds = require("@sap/cds");

class UserService extends cds.ApplicationService {
  async init() {
    this.apis = await this.getAPIS();

    const { Entries, Projects, WBSElements } = this.entities;

    this.on("READ", Entries, async (req, next) => {
      return await this._autoExpand(req, next);
    });

    this.on("READ", [Projects, WBSElements], async (req) => {
      return await this.apis.get("API_PROJECT_V3").run(req.query);
    });

    return await super.init();
  }

  async getAPIS() {
    const services = Object.values(cds.model.services);
    const promises = services
      .filter((service) => service["@cds.external"])
      .map((service) => {
        return cds.connect.to(service.name);
      });
    const apis = await Promise.all(promises);
    return new Map(apis.map((api) => [api.name, api]));
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
    const association =
      definitions[currentEntity].associations[associationName];

    // TODO: Test if propper key
    const key = association.keys[0].ref[0];
    const associationKey = association.keys[0].$generatedFieldName;

    const expandEntityName = association.target;
    const entity = definitions[expandEntityName];

    const entitySchemaPath = entity.projection.from.ref[0];
    const entitySchema = definitions[entitySchemaPath];

    const isFromRemote = entitySchema.query?.source["@cds.external"];

    if (!isFromRemote) {
      return undefined;
    }
    const service = entitySchema.projection.from.ref[0].split(".")[0];
    return {
      associationName: associationName,
      associationKey: associationKey,
      key: key,
      entity: entity,
      service: service,
    };
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

    let data = await next();

    if (!Array.isArray(data)) {
      data = [data];
    }

    for (let i = 0; i < remoteObjects.length; i++) {
      const remoteObject = remoteObjects[i];
      const expandColumns = columns[remoteObject.index].expand;

      this._addId(expandColumns, remoteObject.key);

      const expandIDs = [
        ...new Set(
          data.reduce((expandColumn, item) => {
            if (item[remoteObject.associationKey]) {
              expandColumn.push(item[remoteObject.associationKey]);
            }
            return expandColumn;
          }, [])
        ),
      ];

      if (expandIDs.length <= 0) {
        return;
      }

      const expands = await this.apis.get(remoteObject.service).run(
        SELECT(expandColumns)
          .from(remoteObject.entity)
          .where({ [remoteObject.key]: expandIDs })
      );

      const mExpands = new Map(expands.map((expand) => [expand.ID, expand]));

      data.forEach((item) => {
        item[remoteObject.associationName] = mExpands.get(
          item[remoteObject.associationKey]
        );
        delete item[remoteObject.associationKey];
      });
    }
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
