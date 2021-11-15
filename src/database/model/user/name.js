const Global = Object.create({
    initialize: false
});

import { Schema, Model } from "./../../index.js";

export const Type = {
    First: {
        required: true,
        type: String,
        alias: "first"
    },
    Middle: {
        required: false,
        type: String,
        default: null,
        alias: "middle"
    },
    Last: {
        required: true,
        type: String,
        alias: "last"
    },

    Preferred: {
        required: false,
        type: String,
        default: null,
        alias: "preferred"
    },

    Alias: {
        required: false,
        type: String,
        default: null,
        alias: "alias"
    }
}

/***
 * @type {import("mongoose").Schema<type>}
 */

const Definition = new Schema(Type);

/***
 * @type {import("mongoose").Model<Definition>}
 */

const Instance = Model( "User-Name", Definition, "User-Name", false);

export const Record = new Instance({
    First: "First-Name",
    Middle: "Middle-Name",
    Last: "Last-Name"
});

const Initialize = (await Instance.collection.stats()).count === 0;
(Global.initialize || Initialize) && await Record.save(async (error) => {
    if (error && (await Instance.collection.stats()).count === 0) {
        console.error("[Error]", error);
    } else {
        console.debug("[Debug]", "Successfully Established Database Record" + ":", "User.Name");
    }
});

export default Definition;