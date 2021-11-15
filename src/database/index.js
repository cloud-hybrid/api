import { Library } from "@cloud-technology/api-library";

Library.ORM.set("autoIndex", false);

export const Schema = Library.ORM.Schema;

export const Model = Library.ORM.model;

await Library.ORM.connect("mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false", {
    dbName: "Nexus-Dashboard",
    maxPoolSize: 10,
    keepAlive: true,
    autoIndex: true,
    appName: process.env["Server"] || "Nexus-API"
});

export default Library.ORM;