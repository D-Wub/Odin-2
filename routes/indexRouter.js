const { Router } = require("express");
const { boardController, validatePost } = require("../controllers/boardController");
const indexRouter = Router();

indexRouter.get("/", boardController.renderIndex);
indexRouter.get("/new", boardController.renderForm);

indexRouter.post("/new", validatePost, boardController.postMessage);

module.exports = indexRouter;