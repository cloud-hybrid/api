const Global = Object.create({
    initialize: true
});

import * as Name from "./name.js";

import {
    Schema,
    Model
} from "./../../index.js";

export const Type = {
    Email: {
        index: true,
        alias: "email",
        unique: true,
        required: true,
        lowercase: true,
        trim: true,
        type: String
    },

    Name: {
        alias: "name",
        unique: false,
        required: true,
        lowercase: false,
        type: Name.default
    }
}

/***
 * @type {import("mongoose").Schema<type>}
 */

export const Definition = new Schema(Type);

/***
 * @type {import("mongoose").Model<Definition>}
 */

const Instance = Model("User", Definition, "User", false);

const Record = new Instance({ Name: Name.Record, Email: "schema@internal.io" });

const Initialize = (await Instance.collection.stats()).count === 0;
(Global.initialize || Initialize) && await Record.save(async (error) => {
    if (error && (await Instance.collection.stats()).count === 0) {
        console.error("[Error]", error);
    } else {
        console.debug("[Debug]", "Successfully Established Database Record" + ":", "User");
    }
});

export default Instance;