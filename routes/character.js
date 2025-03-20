const express = require("express");
const router = express.Router();

router.get("/character/:characterId", async (req, res) => {
  try {
    // identifier
    console.log("New specific character request :", req.params);

    // extraire
    const reponse = await fetch(
      "https://lereacteur-marvel-api.herokuapp.com/character/" +
        req.params.characterId +
        "?apiKey=" +
        process.env.API_MARVEL
    );

    const character = await reponse.json();

    // retourner
    console.log("Character name :", character.name);
    console.log("--------------------------");
    res.status(200).json(character);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

module.exports = router;
