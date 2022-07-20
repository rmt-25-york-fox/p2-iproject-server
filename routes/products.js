let express = require("express");
let router = express.Router();
const productController = require("../controllers/productController");

router.get("/pokemons", productController.allPokemon);
router.get("/pokemons/:name", productController.pokemonDetail);
// router.post("/leaderboards", productController.tokenLeaderboard);

module.exports = router;
