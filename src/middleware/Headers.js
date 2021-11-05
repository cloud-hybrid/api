import { Application } from "./../index.js";

const Overwrites = [
    {
        Key: "Server",
        Value: process.env["Server"] || "Nexus"
    },
    {
        Key: "X-Powered-By",
        Value: "Nexus"
    }
];

Application.use((_, response, $) => {
    Overwrites.forEach((Element, Index) => {
        response.setHeader(Element.Key, Element.Value);
    });

    $();
});

export const Headers = () => Application;