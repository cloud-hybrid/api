import { Application } from "../index.js";

import { default as Headers } from "./Headers.js";
import { default as Compression } from "./Compression.js";

Application.use((_, response, $) => {
    Headers.forEach((Element, Index) => {
        response.setHeader(Element.Key, Element.Value);
    });

    $();
});

Application.use(Compression());

export const Middleware = () => Application;
