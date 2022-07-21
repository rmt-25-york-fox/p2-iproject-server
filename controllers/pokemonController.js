const { UserPokemon } = require("../models");

let axios = require("axios");

const allPokemon = async (req, res, next) => {
  try {
    // console.log(req.query);
    const response = await axios.get(
      req.query.url
        ? req.query.url
        : `https://pokeapi.co/api/v2/pokemon?offset=0&limit=30`
    );

    let result = response.data.results.map(async (el) => {
      const data = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${el.name}`
      );
      return data.data;
    });
    res.status(200).json({
      data: await Promise.all(result),
      next: response.data.next,
      prev: response.data.prev,
    });
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

const userPokemon = async (req, res, next) => {
  try {
    const { id } = req.user;
    const { name } = req.params;
    const response = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/${name}`
    );
    // console.log(response.data.sprites.other["official-artwork"].front_default);
    const createPokemon = await UserPokemon.create({
      name: response.data.name.toUpperCase(),
      imgUrl: response.data.sprites.other["official-artwork"].front_default,
      type: response.data.types[0].type.name,
      UserId: id,
    });
    // console.log(createPokemon);
    if (!createPokemon) {
      throw { name: "Invalid Request" };
    } else {
      res.status(201).json(createPokemon);
    }
  } catch (err) {
    // console.log(err);
    next(err);
  }
};

const allPocket = async (req, res, next) => {
  try {
    const UserId = req.user.id;
    let pokemons = await UserPokemon.findAll({
      where: { UserId },
    });
    if (!pokemons) {
      throw { name: "Pokemon Not Found" };
    }
    res.status(200).json(pokemons);
  } catch (err) {
    // console.log(err);
    next(err);
  }
};

module.exports = {
  pokemonDetail,
  allPokemon,
  userPokemon,
  allPocket,
};
