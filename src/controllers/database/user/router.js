import { Controller } from "./controller.js";

import { Normalize } from "./../../../utilities/configuration.js";

import { Module } from "./api.js";

Controller.get("/", async (request, response) => {
    const $ = await Module.Schema();
    const Query = Normalize(request, response, $);
    const Response = Query.toJSON();

    console.debug("[Debug]", "Response", "(" + request.url + ")", Response);

    response.send(Response);
});

Controller.get("/definition", async (request, response) => {
    const $ = await Module.Definition();
    const Query = Normalize(request, response, $);
    const Response = Query.toJSON();

    console.debug("[Debug]", "Response", "(" + request.url + ")", Response);

    response.send(Response);
});

Controller.get("/statistics", async (request, response) => {
    const $ = await Module.Statistics();
    const Query = Normalize(request, response, $);
    const Response = Query.toJSON();

    console.debug("[Debug]", "Response", "(" + request.url + ")", Response);

    response.send(Response);
});

Controller.get("/email", async (request, response) => {
    const $ = await Module.Email();
    const Query = Normalize(request, response, $);
    const Response = Query.toJSON();

    console.debug("[Debug]", "Response", "(" + request.url + ")", Response);

    response.send(Response);
});

export default Controller;
