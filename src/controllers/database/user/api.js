import { Call } from "./../../../utilities/request.js";

/***
 *
 * @param page
 * @param items
 * @returns {string}
 *
 * @constructor
 *
 */

import * as User from "./../../../database/model/user/index.js";

export const Schema = async () => {
    return User.default.schema;
};

export const Definition = async () => {
    return User.Definition;
};

export const Statistics = async () => {
    return await User.default.collection.stats();
}

export const Email = async () => {
    const Query = User.default.findOne({ "Name.Email": "schema@internal.io" });
    const Data = await Query.exec();
    return Data.toObject();
}

export const Module = {
    Schema, Definition, Statistics, Email
};

export default Module;