import { Library } from "@cloud-technology/api-library";

import { Generator } from "./../../utilities/configuration.js";

import { Query, Projects, Pages, Empties, Total } from "./projects.js";

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

Controller.get("/projects/total", async (request, response) => {
    const Query = await Total();

    const $ = Generator(request, {});
    $.Body["Total"] = Query;
    const Body = $.toJSON();

    /// HTTP(s) Response
    response.type($.Configuration.Type);
    response.status($.Configuration.Status);
    response.contentType($.Configuration.Type);
    response.statusMessage = $.Configuration.Message;

    response.shouldKeepAlive = $.Configuration["Keep-Alive"];

    response.send(Body);
});

Controller.get("/projects/pages", async (request, response) => {
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

Controller.get("/projects/empty", async (request, response) => {
    const Query = await Empties();

    const $ = Generator(request, {});
    $.Body["Projects"] = Query;
    const Body = $.toJSON();

    /// HTTP(s) Response
    response.type($.Configuration.Type);
    response.status($.Configuration.Status);
    response.contentType($.Configuration.Type);
    response.statusMessage = $.Configuration.Message;

    response.shouldKeepAlive = $.Configuration["Keep-Alive"];

    response.send(Body);
});

Controller.get("/projects/empty/total", async (request, response) => {
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