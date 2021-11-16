const express = require("express");
const router = express.Router();
const mongodb = require("mongodb");
const Product = require("../models/product");
const dbMethodHandler = require("./helpers");

router.get(
  "/",
  dbMethodHandler((req) => Product.find({}))
);

router.get(
  "/:id",
  dbMethodHandler((req) => Product.findById(req.params.id))
);

router.delete(
  "/:id",
  dbMethodHandler((req) =>
    Product.deleteOne({
      _id: new mongodb.ObjectId(req.params.id),
    })
  )
);

router.post("/", async (req, res) => {
  try {
    const product = new Product({
      image: req.body.image,
      title: req.body.title,
      desc: req.body.desc,
      pressure: req.body.pressure,
      weight: req.body.weight,
      type: req.body.type,

      translations: {
        ar: {
          titleAr: req.body.translations.ar.titleAr,
          descAr: req.body.translations.ar.descAr,
          pressureAr: req.body.translations.ar.pressureAr,
          weightAr: req.body.translations.ar.weightAr,
          typeAr: req.body.translations.ar.typeAr,
        },
      },
    });

    const data = await product.save();
    res.json(data);
  } catch (err) {
    res.status(400).json({ message: err });
    console.error(err);
  }
});

module.exports = router;
