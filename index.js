require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGODB_URI);

const charactersRoutes = require("./routes/characters");
const characterRoutes = require("./routes/character");
const comicsRoutes = require("./routes/comics");
const userRoutes = require("./routes/user");
const userFavorites = require("./routes/favorites");

app.get("/", (req, res) => {
  return res.json({ message: "Welcome to Marvel" });
});

app.use(charactersRoutes);
app.use(characterRoutes);
app.use(comicsRoutes);
app.use(userRoutes);
app.use(userFavorites);

app.all("*", (req, res) => {
  return res.status(404).json("404 : Page not found");
});

app.listen(process.env.PORT, () => {
  console.log("Server Marvel : started");
});
