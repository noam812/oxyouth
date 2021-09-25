const mongoose = require("mongoose");

const SliderImageSchema = mongoose.Schema({
  image: { type: String, required: true },
  desc: { type: String, required: true },
  link: { type: String, required: false },
  translations: {
    ar: {
      descAr: { type: String, required: true },
      linkAr: { type: String, required: false },
    },
  },
});

module.exports = mongoose.model("sliderImages", SliderImageSchema);
