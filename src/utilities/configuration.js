/***
 *
 * @param request {Request}
 * @param body {Object|null}
 * @returns {{Response: {"Keep-Alive": boolean, Status: number, Type: string, Message: string, Request: {Headers, URL: {Origin: *, Normalized, Base: *}}, Body: {Status: string}}, toJSON: (function(): string), Configuration: {"Keep-Alive": boolean, Status: number, Type: string, Message: string}, Request: {Headers, URL: {Origin: *, Normalized, Base: *}}, Body: {Status: string}}}
 * @constructor
 *
 */

export const Generator = (request, body = null, headers = null) => {
    /***
     *
     * @type {{Headers, URL: {Origin: *, Normalized, Base: *}}}
     *
     */

    const Request = {
        Headers: (headers === null) ? request.headers : { ... request.headers, ... headers },
        URL: {
            Base: request.baseUrl,
            Origin: request.originalUrl,
            Normalized: request.url
        }
    };

    /***
     *
     * @type {{"Keep-Alive": boolean, Status: number, Type: string, Message: string}}
     *
     */

    const Configuration = {
        "Keep-Alive": false,
        Status: 200,
        Message: "Online",
        Type: "Application/JSON"
    };

    /***
     *
     * @type {{Status: string}}
     *
     */

    const Body = (
        body !== null
    )
        ? { ... body }
        : { Status: "Online" };

    /***
     *
     * @type {{"Keep-Alive": boolean, Status: number, Type: string, Message: string, Request: {Headers, URL: {Origin: *, Normalized, Base: *}}, Body: {Status: string}}}
     *
     */

    const Response = {
        ... Configuration,
        Request: Request,
        Body: Body
    };

    return { Request, Response, Configuration, Body, toJSON: () => JSON.stringify(Response, null, 4) };
};