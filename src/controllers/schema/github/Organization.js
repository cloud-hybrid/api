import { Octokit } from "@cloud-technology/api-library";

const API = new Octokit({ auth: process.env["GitHub-Token"] });

/***
 *
 * @param obj {object}
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
 * @returns {Promise<{}>}
 *
 * @constructor
 *
 */

export const Data = async () => {
    const {
        data: { login }
    } = await API.rest.users.getAuthenticated();

    console.debug("[Debug] User Organization Request", login);

    const Organization = await API.rest.orgs.get({
        org: process.env["GitHub-Organization"]
    });

    return flatten(Organization);
};

/***
 *
 * @returns {Promise<{Object}>}
 *
 */

export default async () => await Data();
