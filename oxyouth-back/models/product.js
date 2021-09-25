const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema({
  image: { type: String, required: true },
  title: { type: String, required: true },
  desc: { type: String, required: true },
  pressure: { type: String, required: true },
  weight: { type: String, required: true },
  type: { type: String, required: true },

  translations: {
    ar: {
      titleAr: { type: String, required: true },
      descAr: { type: String, required: true },
      pressureAr: { type: String, required: true },
      weightAr: { type: String, required: true },
      typeAr: { type: String, required: true },
    },
  },
});

module.exports = mongoose.model("products", ProductSchema);
