const { Product, Category, User, History, Wishlist } = require("../models");
const { Op } = require("sequelize");
let axios = require("axios");

const allPokemon = async (req, res, next) => {
  try {
    const response = await axios.get(
      `https://pokeapi.co/api/v2/pokemon?offset=0&limit=30`
    );
    let result = response.data.results.map(async (el) => {
      const data = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${el.name}`
      );
      return data.data;
    });

    res.status(200).json(await Promise.all(result));
  } catch (error) {
    // console.log(error);
    next(error);
  }
};

const pokemonDetail = async (req, res, next) => {
  try {
    let { name } = req.params;
    // console.log(name);
    const response = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/${name}`
    );
    res.status(200).json(response.data);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  // getPokemon,
  pokemonDetail,
  allPokemon,
};
