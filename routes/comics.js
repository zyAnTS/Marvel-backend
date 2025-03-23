const express = require("express");
const router = express.Router();

router.get("/comics", async (req, res) => {
  try {
    // identifier
    console.log("New comics request...");
    console.log(req.query);

    // filtrer
    let limit = 100;

    let filters = "";

    if (req.query.limit) {
      limit = req.query.limit;
      filters += "&limit=" + limit;
    }

    if (req.query.title) {
      filters += "&title=" + req.query.title;
    }

    if (req.query.page) {
      const skip = (req.query.page - 1) * limit;
      filters += "&skip=" + skip;
    }

    // extraire
    const reponse = await fetch(
      "https://lereacteur-marvel-api.herokuapp.com/comics?apiKey=" +
        process.env.API_MARVEL +
        filters
    );

    const list = await reponse.json();
    const comicsList = list.results;

    // retourner
    console.log("Comics count :", list.count);
    console.log("--------------------------");
    return res.status(200).json(list);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.get("/comics/:characterId", async (req, res) => {
  try {
    // identifier
    console.log("Comics with specific character request : ", req.params);

    // extraire
    const reponse = await fetch(
      "https://lereacteur-marvel-api.herokuapp.com/comics/" +
        req.params.characterId +
        "?apiKey=" +
        process.env.API_MARVEL
    );

    const list = await reponse.json();
    const comicsList = list.comics;

    // retourner
    console.log("Character's name :", list.name);
    console.log("Comics count :", comicsList.length);
    console.log("--------------------------");
    return res.status(200).json(comicsList);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

module.exports = router;
