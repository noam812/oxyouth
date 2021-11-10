const express = require("express");
const mongodb = require("mongodb");
const router = express.Router();
const SliderImage = require("../models/sliderImage");

router.get("/", async (req, res) => {
  try {
    const sliderImagesData = await SliderImage.find({});
    res.send(sliderImagesData);
  } catch (err) {
    console.error(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const slideDelete = await SliderImage.deleteOne({
      _id: new mongodb.ObjectId(req.params.id),
    });
    res.redirect("/");
  } catch (err) {
    console.error(err);
  }
});

router.post("/", async (req, res) => {
  const slider = new SliderImage({
    image: req.body.image,
    desc: req.body.desc,
    link: req.body.link,
    translations: {
      ar: {
        descAr: req.body.translations.ar.descAr,
        linkAr: req.body.translations.ar.linkAr,
      },
    },
  });

  slider
    .save()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(400).json({ message: err });
    });
});
module.exports = router;
