import * as FS from "fs";
import * as Path from "path";
import * as Process from "process";

import { Signal } from "./index.js";

const $ = "server.json";
const CWD = () => Process.cwd();
const Folder = ".ci/configuration";

/***
 * ### Pathing Normalization
 *
 * @param cwd {string} - Current Working Directory
 * @param folder {string} - Relative Folder Path
 * @param file {string|null} - Target File + Extension
 *
 * @example ```javascript
 * const $ = Target(process.cwd(), ".ci", "server.json");
 * ```
 *
 * @returns {string}
 *
 */

export const Target = (cwd = CWD(), folder= Folder, file= $) => [cwd, folder, file].join(Path.sep);

/***
 * ### File-to-Buffer Reader
 *
 * @param cwd {string} - Local JSON-Serializable File
 * @param dir {string} - Relative Folder Path
 * @param f {string|null} - Target File + Extension
 *
 * @example ```javascript
 * const $ = $_("server.json");
 * ```
 *
 * @returns {Object}
 *
 */

export const $_ = ( f, dir= ".ci/configuration", cwd = CWD() ) => FS.readFileSync(Target(cwd, dir, f), "UTF-8");

/***
 * ### Buffer-to-JSON Object
 *
 * @param file {string} - Local JSON-Serializable File
 *
 * @example ```javascript
 * const $ = $_("server.json");
 * ```
 *
 * @returns {Object}
 *
 */

export const Parse = ( file ) => JSON.parse($_(file));

export const Package = JSON.parse($_("package.json", ""));

(FS.existsSync(Target())) || Process.exit(Signal.EEXIST);

process.env = { ... process.env, ... { Package } };

process.env = { ... process.env, ... { Redis: Parse("redis.json") } };
process.env = { ... process.env, ... { Server: Parse("server.json") } };
process.env = { ... process.env, ... { Cluster: Parse("cluster.json") } };