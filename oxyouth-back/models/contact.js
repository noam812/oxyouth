const mongoose = require("mongoose");

const ContactSchema = mongoose.Schema({
  fullname: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  subject: { type: String, required: true },
  content: { type: String, required: true },
  opened: { type : Boolean, required: true },
});

module.exports = mongoose.model("contact", ContactSchema);
