const express = require("express");
const router = express.Router();
const isAuthenticated = require("../middlewares/isAuthenticated");

const FavoriteCharacter = require("../models/FavoriteCharacter");
const FavoriteComics = require("../models/FavoriteComics");

router.post("/favorites/character", isAuthenticated, async (req, res) => {
  try {
    // identifier
    console.log("Attempt to create favorite character :");
    console.log("User ID :", req.user.email);
    console.log(req.user);
    console.log(req.body);
    const favoriteExist = await FavoriteCharacter.findOne({
      name: req.body.name,
    });

    // sécuriser
    if (favoriteExist) {
      console.log("Already existing favorite :", req.body.name);
      console.log("--------------------");
      return res.status(400).json({ error: "Favorite already existe" });
    }

    // créer
    const { thumbnail, comics, name, description, favorite } = req.body;

    const newFavorite = new FavoriteCharacter({
      thumbnail: thumbnail,
      comics: comics,
      name: name,
      description: description,
      favorite: favorite,
      owner: req.user,
    });

    // sauvegarder et retourner
    await newFavorite.save();

    console.log("Favorite character created");
    console.log("--------------------");
    return res.status(201).json(newFavorite);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.post("/favorites/comics", isAuthenticated, async (req, res) => {
  try {
    // identifier
    console.log("Attempt to create favorite comics :");
    console.log("User ID :", req.user.email);
    console.log(req.user);
    console.log(req.body);
    const favoriteExist = await FavoriteComics.findOne({
      title: req.body.title,
    });

    // sécuriser
    if (favoriteExist) {
      console.log("Already existing favorite :", req.body.title);
      console.log("--------------------");
      return res.status(400).json({ error: "Favorite already existe" });
    }

    // créer
    const { thumbnail, comics, title, description, favorite } = req.body;

    const newFavorite = new FavoriteComics({
      thumbnail: thumbnail,
      comics: comics,
      title: title,
      description: description,
      favorite: favorite,
      owner: req.user,
    });

    // sauvegarder et retourner
    await newFavorite.save();

    console.log("Favorite comics created");
    console.log("--------------------");
    return res.status(201).json(newFavorite);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.get("/favorites/character", async (req, res) => {
  try {
    // identifier
    console.log("Character search :", req.query);

    let filter = {};

    if (req.query.owner) {
      filter.owner = req.query.owner;
    }

    const charactersLength = await FavoriteCharacter.countDocuments(
      req.query.owner
    );
    const characters = await FavoriteCharacter.find(filter);

    // retourner
    console.log("Characters find :");
    console.log(characters);
    console.log("--------------------");
    res.status(200).json(characters);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.get("/favorites/comics", async (req, res) => {
  try {
    // identifier
    console.log("Comics search :", req.query);

    let filter = {};

    if (req.query.owner) {
      filter.owner = req.query.owner;
    }

    const comicsLength = await FavoriteComics.countDocuments(req.query.owner);
    const comics = await FavoriteComics.find(filter);

    // retourner
    console.log("Comics find :");
    console.log(comics);
    console.log("--------------------");
    res.status(200).json(comics);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.delete("/favorites/character/:_id", async (req, res) => {
  try {
    // identifier
    console.log("deletion favorite :", req.params._id);
    const favoriteToDelete = await FavoriteCharacter.findById(req.params._id);
    console.log("Favorite : ", favoriteToDelete.name);

    // supprimer et retourner
    await favoriteToDelete.deleteOne();
    console.log("Favorite deleted");
    console.log("----------");
    return res.status(200).json({ message: "Favorite deleted" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.delete("/favorites/comics/:_id", async (req, res) => {
  try {
    // identifier
    console.log("deletion favorite :", req.params._id);
    const favoriteToDelete = await FavoriteComics.findById(req.params._id);
    console.log("Favorite : ", favoriteToDelete.title);

    // supprimer et retourner
    await favoriteToDelete.deleteOne();
    console.log("Favorite deleted");
    console.log("----------");
    return res.status(200).json({ message: "Favorite deleted" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

module.exports = router;
