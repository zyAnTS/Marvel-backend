const express = require("express");
const router = express.Router();

router.get("/characters", async (req, res) => {
  try {
    // identifier
    console.log("New characters request...");
    console.log(req.query);

    // filtrer
    let limit = 100;

    let filters = "";

    if (req.query.limit) {
      limit = req.query.limit;
      filters += "&limit=" + limit;
    }

    if (req.query.name) {
      // const name = new RegExp(req.query.name, "i");
      filters += "&name" + req.query.name;
    }

    if (req.query.page) {
      const skip = (req.query.page - 1) * limit;
      filters += "&skip" + skip;
    }

    // extraire
    const reponse = await fetch(
      "https://lereacteur-marvel-api.herokuapp.com/characters?apiKey=" +
        process.env.API_MARVEL +
        filters
    );

    const list = await reponse.json();
    const charactersList = list.results;

    // retourner
    console.log("Characters count :", list.count);
    console.log("--------------------------");
    return res.status(200).json(charactersList);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

module.exports = router;
