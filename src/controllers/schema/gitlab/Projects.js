import { default as Outbound } from "./../../../utilities/request.js";
import { default as flatten } from "./../../../utilities/flatten.js";

/***
 *
 * @returns {Promise<{}>}
 *
 * @constructor
 *
 */

const Data = async () => {
    const Query = await Outbound({
        path: process.env["GitLab"]["Projects"] + "?" + "page=1" + "&" + "per_page=1",
        host: process.env["GitLab"]["Host"],
        port: 443,
        requestCert: true,
        rejectUnauthorized: false
    }, {
        "PRIVATE-TOKEN": process.env["GitLab-Token"]
    });

    return flatten(JSON.parse(Query)["0"]);
};

export default async () => await Data();
