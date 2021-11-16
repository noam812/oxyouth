const express = require("express");
const mongodb = require("mongodb");
const router = express.Router();
const FaqModel = require("../models/faq");
const dbMethodHandler = require("./helpers");

router.get(
  "/",
  dbMethodHandler((req) => FaqModel.find({}))
);

router.get(
  "/:id",
  dbMethodHandler((req) => FaqModel.findById(req.params.id))
);

router.delete(
  "/:id",
  dbMethodHandler((req) =>
    FaqModel.deleteOne({
      _id: new mongodb.ObjectId(req.params.id),
    })
  )
);

router.post("/", async (req, res) => {
  try {
    const faq = new FaqModel({
      question: req.body.question,
      answer: req.body.answer,
      translations: {
        ar: {
          questionAr: req.body.translations.ar.questionAr,
          answerAr: req.body.translations.ar.answerAr,
        },
      },
    });

    const data = await faq.save();
    res.json(data);
  } catch (err) {
    res.status(400).json({ message: err });
    console.error({err})
  }
});

module.exports = router;
