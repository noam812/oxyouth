const express = require("express");
const router = express.Router();
const mongodb = require("mongodb");

const Product = require("../models/product");

router.get("/", async (req, res) => {
  try {
    const productsData = await Product.find({});
    res.send(productsData);
  } catch (err) {
    console.error(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const productsData = await Product.findById(req.params.id);
    res.send(productsData);
  } catch (err) {
    console.error(err);
  }
});
router.delete("/:id", async (req, res) => {
  try {
    const productDelete = await Product.deleteOne({
      _id: new mongodb.ObjectId(req.params.id),
    });
    res.redirect("/");
  } catch (err) {
    console.status(400).error(err);
  }
});

router.post("/", async (req, res) => {
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

  product
    .save()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json({ message: err });
    });
});

module.exports = router;
