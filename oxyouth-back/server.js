const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
require("dotenv").config();

async function main() {
  const app = express();
  app.use(cors());
  app.use(bodyParser.json());

  const PORT = process.env.PORT || 3001;
  mongoose.connect(
    process.env.DB_CONNECTION,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => console.log("connected to db")
  );

  app.get("/api", function (req, res) {
    res.send("Ready To go from API ");
  });

  const productsRoute = require("./routes/products");
  const sliderRoute = require("./routes/sliderImages");
  const articlesRoute = require("./routes/articles");
  const contactRoute = require("./routes/contact");
  const faqRoute = require("./routes/faq");

  app.use("/api/products", productsRoute);

  app.use("/api/slider", sliderRoute);

  app.use("/api/articles", articlesRoute);

  app.use("/api/contact", contactRoute);

  app.use("/api/faq", faqRoute);

  app.use(express.static(path.join(__dirname, "build")));
  app.get("/", (req, res) =>
    res.sendFile(path.join(__dirname, "build/index.html"))
  );

  app.listen(PORT, () => console.log("listening"));
}

main();
