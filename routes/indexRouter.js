const { Router } = require("express");
const indexRouter = Router();

const getDate = () => {
  const date = new Date();
  return date.toLocaleString();
}

const messages = [
  {
    text: "Foolishness...",
    user: "Vergil",
    added: getDate()
  },
  {
    text: "Jackpot!",
    user: "Dante",
    added: getDate()
  }
];

indexRouter.get("/", (req, res) => res.render("index", { title: "Message Board", messages }));
indexRouter.get("/new", (req, res) => res.render("form"))

indexRouter.post("/new", (req, res) => {
  messages.push({ text: req.body.messageText, user: req.body.authorName, added: getDate() });
  res.redirect("/")
})

module.exports = indexRouter;