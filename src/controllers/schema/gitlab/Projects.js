import { default as Outbound } from "./../../../utilities/request.js";

/***
 *
 * @param page
 * @param items
 * @returns {string}
 *
 * @constructor
 *
 */

const URL = (page = 1, items = 1) => {
    const Base = process.env["GitLab-API"];
    const Extension = "projects";
    const Page = (index) => `page=${ index }`;
    const Per = (index) => `per_page=${ index }`;

    return Base + Extension + "?" + Page(page) + "&" + Per(items);
};

/***
 *
 * @returns {Promise<AxiosResponse<any>>}
 *
 * @constructor
 *
 */

const Total = async () => await axios.get(URL(), {
    headers: {
        "PRIVATE-TOKEN": process.env["GitLab-Token"]
    }
}).then(
    (Data) => Data.headers["x-total-pages"]
);

/***
 *
 * @param obj
 *
 * @returns {{}}
 *
 */

const flatten = (obj) => {
    const _ = {};

    Object.keys(obj).forEach((key, index) => {
        _[key] = typeof obj[key];

        if ( typeof obj[key] === "object" && obj[key] !== null ) {
            _[key] = flatten(obj[key]);
        } else (
            obj[key] === null
        ) ? _[key] = null
            : _[key] = typeof obj[key];

    });

    return _;
};

/***
 *
 * @returns {Promise<string>}
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
