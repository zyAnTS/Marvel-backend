const mongoose = require("mongoose");

const FavoriteComics = mongoose.model("FavoriteComics", {
  thumbnail: Object,
  title: String,
  description: String,
  favorite: Boolean,
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = FavoriteComics;
