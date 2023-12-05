const cds_swagger = require("cds-swagger-ui-express");
const cds = require("@sap/cds");

cds.on("bootstrap", (_app) => _app.use(cds_swagger()));

module.exports = cds.server;
