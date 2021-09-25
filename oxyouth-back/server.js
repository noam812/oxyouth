const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
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

  app.use("/api/products", productsRoute);

  const sliderRoute = require("./routes/sliderImages");

  app.use("/api/slider", sliderRoute);

  const articlesRoute = require("./routes/articles");

  app.use("/api/articles", articlesRoute);

  app.listen(PORT, () => console.log("listening"));
}

main();
