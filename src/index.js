import { Library } from "@cloud-technology/api-library";

/***
 *
 * @type {Express}
 *
 */

export const Application = Library.Framework();

Application.routes = [];

Application.listen(8080, "localhost", async () => {
    const Import = async () => {
        return Promise.allSettled((
            [
                import("./environment/index.js").then((Module) => Module.default()),
                import("./middleware/index.js").then((Module) => Module.Middleware())
            ]
        ));
    };

    await Import();

    const API = (
        await import("./controllers/controller.js")
    ).Controller;

    const Controller = (
        await import("./controllers/index.js")
    ).default;

    const V1 = (
        await import("./controllers/v1.js")
    ).default;

    const V2 = (
        await import("./controllers/v2.js")
    ).default;

    Application.use("/", API);
    Application.use("/api", API);
    Application.use("/api/v1", API);
    Application.use("/api/v1/schema", Controller.Schema);

    Application.use("/api/testing/v1", V1);
    Application.use("/api/testing/v1", V2);

    /// --> Log Routes
    /// console.debug(Application.router.stack);
    ///
}).on("listening", async () => {
    console.log("Server running on port 8080");
    console.log("   - http://localhost:8080");
    console.log("");
});
