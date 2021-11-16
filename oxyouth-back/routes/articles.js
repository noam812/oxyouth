const express = require("express");
const mongodb = require("mongodb");
const router = express.Router();
const ArticleModel = require("../models/article");
const dbMethodHandler =require("./helpers") 



router.get(
  "/",
  dbMethodHandler((req) => ArticleModel.find({}))
);

router.get(
  "/:id",
  dbMethodHandler((req) => ArticleModel.findById(req.params.id))
);

//Private Requests - only with admin Authentication.

router.delete(
  "/:id",
  dbMethodHandler((req) =>
    ArticleModel.deleteOne({
      _id: new mongodb.ObjectId(req.params.id),
    })
  )
);

router.post("/", async (req, res) => {
  try {
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

    const data = await article.save();
    res.json(data);
  } catch (err) {
    res.status(400).json({ message: err });
    console.error(err);
  }
});

module.exports = router;
