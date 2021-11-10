const express = require("express");
const mongodb = require("mongodb");
const router = express.Router();
const FaqModel = require("../models/faq");

router.get("/", async (req, res) => {
  try {
    const faqData = await FaqModel.find({});
    res.send(faqData);
  } catch (err) {
    console.error(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const faqData = await FaqModel.findById(req.params.id);
    res.send(faqData);
  } catch (err) {
    console.error(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const faqDelete = await FaqModel.deleteOne({
      _id: new mongodb.ObjectId(req.params.id),
    });
    res.redirect("/");
  } catch (err) {
    console.error(err);
  }
});

router.post("/", async (req, res) => {
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

  faq
    .save()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(400).json({ message: err });
    });
});

module.exports = router;
