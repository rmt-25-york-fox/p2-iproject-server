"use strict";
const axios = require("axios");

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    // const sports = require("../data/sports.json");
    // sports.forEach((movie) => {
    //   movie.createdAt = new Date();
    //   movie.updatedAt = new Date();
    // });
    // await queryInterface.bulkInsert("Sports", sports, {});
    let data = [];
    // input sport data to database

    const axios = require("axios");

    const options = {
      method: "GET",
      url: "https://exercisedb.p.rapidapi.com/exercises",
      headers: {
        "X-RapidAPI-Key": "e271177b1dmsh75da436e4a78356p10452ejsnd733e94bc616",
        "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
      },
    };

    const resultAxios = await axios
      .request(options)
      .then(function (response) {
        // console.log(response.data);
        data = response.data;
      })
      .catch(function (error) {
        console.error(error);
      });

    data.forEach((el) => {
      delete el.id;
      el.createdAt = new Date();
      el.updatedAt = new Date();
    });

    await queryInterface.bulkInsert("Sports", data, {
      individualHooks: true,
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    await queryInterface.bulkDelete("Sports", null, {});
  },
};
