import { Library } from "@cloud-technology/api-library";

export const Application = Library.Framework();

Application.listen(8080, "localhost", async () => {
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
    console.log("Server running on port 8080");
    console.log("   - http://localhost:8080");
    console.log("");
});
