import { default as GitHub } from "./github/index.js";
import { default as GitLab } from "./gitlab/index.js";
import { default as Database } from "./database/index.js";

import { Controller } from "./base.js";

Controller.use("/gitlab", GitLab);
Controller.use("/github", GitHub);
Controller.use("/database", Database);

export default Controller;