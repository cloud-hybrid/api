import { Library } from "@cloud-technology/api-library";

import { Application } from "../index.js";

const Compression = Library.Compression;

Application.use(Compression());

export const Compression = () => Application;