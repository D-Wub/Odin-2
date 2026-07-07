const path = require("path");
const db = require("../db/queries");
const { body, validationResult, matchedData } = require("express-validator");

const validatePost = [
  body("authorName")
    .trim()
    .isAlpha("en-US", { ignore: " " }).withMessage("Username must only contain letters.")
    .isLength({ min: 1, max: 60 }).withMessage("Username must be between 1 and 60 characters."),
  body("messageText")
    .trim()
    .isLength({ min: 1, max: 600 })
    .withMessage("Message body must be between 1 and 600 characters or less.")
];

class BoardController {
    renderIndex = async (req, res) => {
        const messages = await db.getMessages();
        res.render("index", { title: "Message Board", messages });
    }

    renderForm = (req, res) => {
        res.render("form");
    }

    postMessage = async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.render("form", {
                errors: errors.array(),
                data: req.body,
            });
        }

        const { authorName, messageText } = matchedData(req);
        await db.createPost(authorName, messageText);
        res.redirect("/")
    }
}

module.exports = {
  boardController: new BoardController(),
  validatePost,
};