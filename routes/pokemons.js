let express = require("express");
let router = express.Router();
const pokemonController = require("../controllers/pokemonController");

router.get("/pokemons", pokemonController.allPokemon);
router.get("/pokemons/:name", pokemonController.pokemonDetail);
router.post("/user/pokemons/:name", pokemonController.userPokemon);
router.get("/user/pocket", pokemonController.allPocket);

module.exports = router;
