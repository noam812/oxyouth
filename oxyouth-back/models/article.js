const mongoose = require("mongoose");

/**
 * Schema for organzing and validating data.
 * Schema is connected to mongoDB -  @see server.js
 */
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


 //Export the new schema/model - (name of the DB folder, the model/schema)
 
module.exports = mongoose.model("articles", ArticleSchema);
