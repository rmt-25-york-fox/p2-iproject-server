let express = require("express");
let router = express.Router();
const productController = require("../controllers/productController");

router.get("/pokemons", productController.allPokemon);
router.get("/pokemons/:name", productController.pokemonDetail);
router.post("/user/pokemons/:name", productController.userPokemon);
router.get("/user/pocket", productController.allPocket);

module.exports = router;
