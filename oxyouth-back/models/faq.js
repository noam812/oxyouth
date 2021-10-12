const mongoose = require("mongoose");

const FaqSchema = mongoose.Schema({
  question:{ type: String, required: true },
  answer: { type: String, required: true },
  translations : {
      ar: {
        questionAr: { type: String, required: true },
        answerAr: { type: String, required: true },
      }
  }
});

module.exports = mongoose.model("faq", FaqSchema);
