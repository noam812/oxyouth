const express = require("express");
const mongodb = require("mongodb");
const router = express.Router();
const contactModel = require("../models/contact");

router.get("/", async (req, res) => {
  try {
    const contactData = await contactModel.find({});
    res.send(contactData);
  } catch (err) {
    console.error(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const contactData = await contactModel.findById(req.params.id);
    res.send(contactData);
  } catch (err) {
    console.error(err);
  }
});


router.post("/", async (req, res) => {
  const contact = new contactModel({
    fullname: req.body.fullname,
    phone: req.body.phone,
    email: req.body.email,
    subject: req.body.subject,
    content: req.body.content,
    opened: req.body.opened,
  });

  contact
    .save()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(400).json({ message: err });
    });
});

module.exports = router;
