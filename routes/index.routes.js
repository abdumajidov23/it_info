const express = require('express');
const indexRouter = express.Router();
const dictionary = require("./dictionary.routes");
const category = require("./category.routes");
const description = require("./description.routes");
const synonym = require("./synonim.routes");
const author = require("./author.routes");

indexRouter.use("/dict",dictionary);
indexRouter.use("/cat", category);
indexRouter.use("/desc", description);
indexRouter.use("/syn", synonym);
indexRouter.use("/author", author);

module.exports = indexRouter;