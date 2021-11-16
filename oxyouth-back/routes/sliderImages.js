const express = require("express");
const mongodb = require("mongodb");
const router = express.Router();
const SliderImage = require("../models/sliderImage");
const dbMethodHandler = require("./helpers");

router.get(
  "/",
  dbMethodHandler((req) => SliderImage.find({}))
);

router.delete(
  "/:id",
  dbMethodHandler((req) =>
    SliderImage.deleteOne({
      _id: new mongodb.ObjectId(req.params.id),
    })
  )
);

router.post("/", async (req, res) => {
  try {
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

    const data = await slider.save();
    res.json(data);
  } catch (err) {
    res.status(400).json({ message: err });
    console.error(err);
  }
});
module.exports = router;
