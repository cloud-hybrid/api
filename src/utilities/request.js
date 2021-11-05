import * as HTTPs from "https";

/***
 * HTTP(s) Request Configuration Object
 */

const Schema = {
    host: typeof String,
    port: typeof Number,
    path: typeof String,
    method: typeof String,
    rejectUnauthorized: typeof Boolean,
    requestCert: typeof Boolean,
    agent: typeof Boolean
};

/***
 *
 * @param host {string}
 * @param port {number}
 * @param path {string}
 * @param method {string| "GET" | "POST" | "..."}
 *
 * @returns {{rejectUnauthorized: boolean, path, agent: boolean, method, port, requestCert: boolean, host}}
 *
 * @constructor
 *
 */

export const Configuration = (host, port, path, method) => {
    return {
        host: host,
        port: port,
        path: path,
        method: method,
        rejectUnauthorized: false,
        requestCert: true,
        agent: false
    };
};

/***
 *
 * @returns {Promise<string>}
 *
 * @param settings {{rejectUnauthorized: boolean, path, agent: boolean, method, port, requestCert: boolean, host}}
 *
 * @param headers {Object}
 *
 * @constructor
 *
 */

export const Query = (settings, headers = null) => new Promise((resolve, reject) => {
    const Request = HTTPs.request({ ... settings, headers: headers }, (response) => {
        let $;

        if ( response.statusCode < 200 || response.statusCode >= 400 ) {
            if ( response.statusCode === 401 ) { /// Unauthorized
                return resolve(JSON.stringify({ Status: response.statusCode, Message: response.statusMessage }, null, 4));
            } else if ( response.statusCode === 405 ) { /// Method Not Allowed
                return resolve(JSON.stringify({ Status: response.statusCode, Message: response.statusMessage }, null, 4));
            } else if ( response.statusCode === 404 ) { /// Endpoint not Found
                return resolve(JSON.stringify({ Status: response.statusCode, Message: response.statusMessage }, null, 4));
            } else {
                return reject(new Error("[Error]" + " " + String(response.statusCode)));
            }
        }

        response.on("data", (chunk) => {
            const Allocation = String(Buffer.from(chunk));
            if ( Allocation !== undefined ) {
                (
                    $ === undefined
                ) ? $ = Allocation
                    : $ += Allocation;
            }
        });

        response.on("end", () => resolve($));
    });

    Request.on("error", (_) => reject(_));

    Request.end();
});

/***
 *
 * @param settings {Configuration}
 * @param headers {{}}
 *
 * @returns {Promise<{Status: {number}, Response: {string}, Message: {string}, Headers: {}, Method: {string}, URL: {string}}>}
 *
 * @constructor
 */

export const Call = async (settings, headers = null) => {
    const Data = {};

    const Response = new Promise((resolve, reject) => {
        const Request = HTTPs.request({ ... settings, headers: headers }, (response) => {
            let $;

            if ( response.statusCode < 200 || response.statusCode >= 400 ) {
                if ( response.statusCode === 401 ) { /// Unauthorized
                    return resolve(JSON.stringify({ Status: response.statusCode, Message: response.statusMessage }, null, 4));
                } else if ( response.statusCode === 405 ) { /// Method Not Allowed
                    return resolve(JSON.stringify({ Status: response.statusCode, Message: response.statusMessage }, null, 4));
                } else if ( response.statusCode === 404 ) { /// Endpoint not Found
                    return resolve(JSON.stringify({ Status: response.statusCode, Message: response.statusMessage }, null, 4));
                } else {
                    return reject(new Error("[Error]" + " " + String(response.statusCode)));
                }
            }

            response.on("data", (chunk) => {
                const Allocation = String(Buffer.from(chunk));
                if ( Allocation !== undefined ) {
                    (
                        $ === undefined
                    ) ? $ = Allocation
                        : $ += Allocation;
                }
            });

            response.on("end", () => {
                Data.Headers = response.headers;
                Data.Method = response.method;
                Data.URL = response.url;
                Data.Status = response.statusCode;
                Data.Message = response.statusMessage;

                resolve($);
            });
        });

        Request.on("error", (_) => reject(_));

        Request.end();
    });

    Data.Response = await Response;

    return Data;
};

export default Query;
