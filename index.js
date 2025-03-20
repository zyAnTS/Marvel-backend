require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());

const charactersRoutes = require("./routes/characters");
const characterRoutes = require("./routes/character");
const comicsRoutes = require("./routes/comics");

app.get("/", (req, res) => {
  return res.json({ message: "Welcome to Marvel - Technique test 190325" });
});

app.use(charactersRoutes);
app.use(characterRoutes);
app.use(comicsRoutes);

app.all("*", (req, res) => {
  return res.status(404).json("404 : Page not found");
});

app.listen(process.env.PORT, () => {
  console.log("Server Marvel : started");
});
