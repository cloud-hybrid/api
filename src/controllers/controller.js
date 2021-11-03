import * as FS from "fs";

import { Library } from "@cloud-technology/api-library";

import { Generator } from "./../utilities/configuration.js";

export const Controller = Library.Router();

Controller.get("/", async (request, response) => {
    const Package = JSON.parse(FS.readFileSync("package.json"));

    const $ = Generator(request, Package);
    const Body = Package["version"];

    /// HTTP(s) Response
    response.type($.Configuration.Type);
    response.status($.Configuration.Status);
    response.contentType($.Configuration.Type);
    response.statusMessage = $.Configuration.Message;

    response.shouldKeepAlive = $.Configuration["Keep-Alive"];

    response.send(Body);
});