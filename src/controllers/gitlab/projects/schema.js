import { Query } from "./api.js";

import { default as flatten } from "./../../../utilities/flatten.js";

/***
 *
 * @type {{Data: [{File: string, URL: string, Name: string}]}}
 *
 */

export const Official = {
    Data: [
        {
            Name: "GitLab CI",
            File: ".gitlab-ci.yml",
            URL: "https://gitlab.com/gitlab-org/gitlab/-/raw/master/app/assets/javascripts/editor/schema/ci.json"
        }
    ]
};

const Request = async () => {
    const $ = await Query();
    return flatten($);
};

const Data = async () => {
    const $ = await Query();
    const Normalize = {
        Project: $.Response["0"]
    };

    return flatten(Normalize);
};

export default {
    Official,

    Request: async () => await Request(),
    Data: async () => await Data()
};
