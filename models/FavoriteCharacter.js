const mongoose = require("mongoose");

const FavoriteCharacter = mongoose.model("FavoriteCharacter", {
  thumbnail: Object,
  comics: Array,
  name: String,
  description: String,
  favorite: Boolean,
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = FavoriteCharacter;
