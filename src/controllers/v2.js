import { Library } from "@cloud-technology/api-library";

const Controller = Library.Router();

Controller.get("/", function (req, res) {
    res.send("...");
});

Controller.get("/health", function (req, res) {
    res.send("Online");
});

export default Controller;
