const mongoose = require("mongoose");

const ArticleSchema = mongoose.Schema({
  title:{ type: String, required: true },
  content: { type: String, required: true },
  translations : {
      ar: {
        titleAr: { type: String, required: true },
        contentAr: { type: String, required: true },
      }
  }
});

module.exports = mongoose.model("articles", ArticleSchema);
