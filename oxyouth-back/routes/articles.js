const express = require("express");
const mongodb = require("mongodb");
const router = express.Router();
const ArticleModel = require("../models/article");

router.get("/", async (req, res) => {
  try {
    const articlesData = await ArticleModel.find({});
    res.send(articlesData);
  } catch (err) {
    console.error(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const articleData = await ArticleModel.findById(req.params.id);
    res.send(articleData);
  } catch (err) {
    console.log(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const articleDelete = await ArticleModel.deleteOne({
      _id: new mongodb.ObjectId(req.params.id),
    });
    res.redirect("/");
  } catch (err) {
    console.error(err);
  }
});

router.post("/", async (req, res) => {
  const article = new ArticleModel({
    title: req.body.title,
    content: req.body.content,
    translations: {
      ar: {
        titleAr: req.body.translations.ar.titleAr,
        contentAr: req.body.translations.ar.contentAr,
      },
    },
  });

  article
    .save()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(400).json({ message: err });
    });
});

module.exports = router;
