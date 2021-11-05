import { Library } from "@cloud-technology/api-library";

import { Generator } from "./../../utilities/configuration.js";
import { Query, Projects, Pages, Empties } from "./projects.js";

export const Controller = Library.Router();

Controller.get("/", async (request, response) => {
    const $ = Generator(request);
    const Body = $.toJSON();

    /// HTTP(s) Response
    response.type($.Configuration.Type);
    response.status($.Configuration.Status);
    response.contentType($.Configuration.Type);
    response.statusMessage = $.Configuration.Message;

    response.shouldKeepAlive = $.Configuration["Keep-Alive"];

    response.send(Body);
});

Controller.get("/query", async (request, response) => {
    const Data = await Query();

    const $ = Generator(request, Data);
    const Body = $.toJSON();

    /// HTTP(s) Response
    response.type($.Configuration.Type);
    response.status($.Configuration.Status);
    response.contentType($.Configuration.Type);
    response.statusMessage = $.Configuration.Message;

    response.shouldKeepAlive = $.Configuration["Keep-Alive"];

    response.send(Body);
});

Controller.get("/projects", async (request, response) => {
    const Query = await Projects();

    const $ = Generator(request, Query);
    const Body = $.toJSON();

    /// HTTP(s) Response
    response.type($.Configuration.Type);
    response.status($.Configuration.Status);
    response.contentType($.Configuration.Type);
    response.statusMessage = $.Configuration.Message;

    response.shouldKeepAlive = $.Configuration["Keep-Alive"];

    response.send(Body);
});

Controller.get("/pages", async (request, response) => {
    const Query = await Pages();

    const $ = Generator(request, Query);
    const Body = $.toJSON();

    /// HTTP(s) Response
    response.type($.Configuration.Type);
    response.status($.Configuration.Status);
    response.contentType($.Configuration.Type);
    response.statusMessage = $.Configuration.Message;

    response.shouldKeepAlive = $.Configuration["Keep-Alive"];

    response.send(Body);
});

Controller.get("/empty-projects", async (request, response) => {
    const Query = await Empties();

    const $ = Generator(request, {});
    $.Body["Empty-Repositories"] = Query;
    const Body = $.toJSON();

    /// HTTP(s) Response
    response.type($.Configuration.Type);
    response.status($.Configuration.Status);
    response.contentType($.Configuration.Type);
    response.statusMessage = $.Configuration.Message;

    response.shouldKeepAlive = $.Configuration["Keep-Alive"];

    response.send(Body);
});

Controller.get("/empty-repositories", async (request, response) => {
    const Query = await Empties();

    const $ = Generator(request, {});
    $.Body["Empty-Repositories"] = Query;
    const Body = $.toJSON();

    /// HTTP(s) Response
    response.type($.Configuration.Type);
    response.status($.Configuration.Status);
    response.contentType($.Configuration.Type);
    response.statusMessage = $.Configuration.Message;

    response.shouldKeepAlive = $.Configuration["Keep-Alive"];

    response.send(Body);
});

Controller.get("/empty-projects/total", async (request, response) => {
    const Query = await Empties();

    const $ = Generator(request, {});
    $.Body["Total"] = Query.length;
    const Body = $.toJSON();

    /// HTTP(s) Response
    response.type($.Configuration.Type);
    response.status($.Configuration.Status);
    response.contentType($.Configuration.Type);
    response.statusMessage = $.Configuration.Message;

    response.shouldKeepAlive = $.Configuration["Keep-Alive"];

    response.send(Body);
});

Controller.get("/empty-repositories/total", async (request, response) => {
    const Query = await Empties();

    const $ = Generator(request, {});
    $.Body["Total"] = Query.length;
    const Body = $.toJSON();

    /// HTTP(s) Response
    response.type($.Configuration.Type);
    response.status($.Configuration.Status);
    response.contentType($.Configuration.Type);
    response.statusMessage = $.Configuration.Message;

    response.shouldKeepAlive = $.Configuration["Keep-Alive"];

    response.send(Body);
});

export default Controller;