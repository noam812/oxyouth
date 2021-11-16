const express = require("express");
const mongodb = require("mongodb");
const router = express.Router();
const contactModel = require("../models/contact");
const dbMethodHandler = require("./helpers");

router.get(
  "/",
  dbMethodHandler((req) => contactModel.find({}))
);

router.get(
  "/:id",
  dbMethodHandler((req) => contactModel.findById(req.params.id))
);

router.post("/", async (req, res) => {
  try {
    const contact = new contactModel({
      fullname: req.body.fullname,
      phone: req.body.phone,
      email: req.body.email,
      subject: req.body.subject,
      content: req.body.content,
      opened: req.body.opened,
    });

    const data = await contact.save();
    res.json(data);
  } catch (err) {
    res.status(400).json({ message: err });

    console.error({ err });
  }
});

module.exports = router;
