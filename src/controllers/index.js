import { default as Schema } from "./schema/index.js";
import { default as GitHub } from "./github/index.js";
import { default as GitLab } from "./gitlab/index.js";

import { Controller } from "./base.js";

Controller.use("/schema", Schema);
Controller.use("/gitlab", GitLab);
Controller.use("/github", GitHub);

export default Controller;