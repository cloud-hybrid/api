import { Library } from "@cloud-technology/api-library";

export const Application = Library.API();

await import("./../.ci/settings.js");

Application.listen(process.env["Server"]["Port"], "localhost", async () => {
    const Import = async () => {
        return Promise.allSettled((
            [
                import("./middleware/Compression.js").then((Module) => Module.Compression()),
                import("./middleware/Environment.js").then((Module) => Module.Inject()),
                import("./middleware/Headers.js").then((Module) => Module.Headers())
            ]
        ));
    };

    await Import();

    const Controller = (
        await import("./controllers/index.js")
    ).default;

    Application.use("/api/v1", Controller);
}).on("listening", async () => {
    console.log("Server Successfully Started via Port" + " " + process.env["Server"]["Port"]);
    console.log("  - http://localhost" + ":" + process.env["Server"]["Port"] + "/api/v1");
    console.log("");
});
