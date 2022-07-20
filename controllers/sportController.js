const { Sport, User, Genre, History, Todo } = require("../models");
const { Op } = require("sequelize");
const axios = require("axios");

const getPagination = (page, size) => {
  const limit = size ? +size : 9;
  const offset = page ? page * limit : 0;
  return { limit, offset };
};

const getPagingData = (data, page, limit) => {
  const { count: totalItems, rows: sports } = data;
  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(totalItems / limit);
  return { totalItems, sports, totalPages, currentPage };
};

class SportController {
  static async createSport(req, res, next) {
    try {
      const { id } = req.user;
      const { title, synopsis, trailerUrl, imgUrl, rating, genreId } = req.body;

      const createSport = await Sport.create({
        title,
        synopsis,
        trailerUrl,
        imgUrl,
        rating,
        genreId,
        authorId: id,
      });

      if (!createSport) {
        next({ name: "NotFound" });
      }

      const createHistory = await History.create({
        SportId: createSport.id,
        title: title,
        description: `New Sport with id ${createSport.id} created`,
        updatedBy: id,
      });

      res.status(201).json({
        statusCode: 201,
        message: `Sport ${title} created successfully`,
        data: createSport,
      });
    } catch (err) {
      next(err);
    }
  }

  static async customerCreateTodo(req, res, next) {
    try {
      console.log("controller createTodo");
      const { id } = req.user; //authorId - UserId
      const { SportId } = req.params;

      const Sport = await Sport.findOne({
        where: {
          id: SportId,
        },
      });

      if (!Sport) {
        next({ name: "SportNotFound" });
      }

      const createTodo = await Todo.create({
        authorId: id,
        SportId: SportId,
      });

      if (!createTodo) {
        next({ name: "NotFound" });
      } else {
        const todoSport = await Sport.findOne({
          where: {
            id: SportId,
          },
        });
        res.status(201).json({
          statusCode: 201,
          message: `Sport '${todoSport.title}' added successfully to Todos`,
          data: createTodo,
        });
      }
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  static async getSports(req, res, next) {
    try {
      let Sports = await Sport.findAll({ include: [User, Genre] });

      if (!Sports) {
        next({ name: "NotFound" });
      } else {
        res.status(200).json({
          statusCode: 200,
          data: Sports,
        });
      }
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  static async customerGetTodo(req, res, next) {
    try {
      console.log("GET TODO");
      const id = req.user.id; //id user bukan id Sport
      console.log(req.user);
      let todo = await Todo.findAll({
        where: { authorId: id },
        include: [{ model: Sport, include: [User, Genre] }],
      });

      if (todo.length === 0) {
        throw { name: "SportNotFound" };
      } else {
        res.status(200).json({
          statusCode: 200,
          data: todo,
        });
      }
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  static async customerGetFitness(req, res, next) {
    try {
      console.log("GET Fitness");
      console.log(req.user);
      const id = req.user.id; //id user bukan id Sport

      let findUser = await User.findByPk(id);

      if (!findUser) throw { name: "InvalidUser" };

      let data = {};

      const options = {
        method: "GET",
        url: "https://fitness-calculator.p.rapidapi.com/bmi",
        params: {
          age: findUser.age,
          weight: findUser.weight,
          height: findUser.height,
        },
        headers: {
          "X-RapidAPI-Key":
            "e271177b1dmsh75da436e4a78356p10452ejsnd733e94bc616",
          "X-RapidAPI-Host": "fitness-calculator.p.rapidapi.com",
        },
      };

      await axios
        .request(options)
        .then(function (response) {
          console.log(response.data);
          data.bmi = response.data.data;
        })
        .catch(function (error) {
          console.error(error);
        });

      const options2 = {
        method: "GET",
        url: "https://fitness-calculator.p.rapidapi.com/idealweight",
        params: { gender: findUser.gender, height: findUser.height },
        headers: {
          "X-RapidAPI-Key":
            "e271177b1dmsh75da436e4a78356p10452ejsnd733e94bc616",
          "X-RapidAPI-Host": "fitness-calculator.p.rapidapi.com",
        },
      };

      await axios
        .request(options2)
        .then(function (response) {
          console.log(response.data);
          data.idealWeight = response.data.data;
        })
        .catch(function (error) {
          console.error(error);
        });

      const options3 = {
        method: "GET",
        url: "https://fitness-calculator.p.rapidapi.com/bodyfat",
        params: {
          age: findUser.age,
          gender: findUser.gender,
          weight: findUser.weight,
          height: findUser.height,
          neck: findUser.neck,
          waist: findUser.waist,
          hip: findUser.hip,
        },
        headers: {
          "X-RapidAPI-Key":
            "e271177b1dmsh75da436e4a78356p10452ejsnd733e94bc616",
          "X-RapidAPI-Host": "fitness-calculator.p.rapidapi.com",
        },
      };

      await axios
        .request(options3)
        .then(function (response) {
          console.log(response.data);
          data.bodyFatPercentage = response.data.data;
        })
        .catch(function (error) {
          console.error(error);
        });

      console.log("data>>>>", data);

      res.status(200).json({ data: data });
    } catch (err) {
      console.log("err>>>>>", err);
      next(err);
    }
  }

  static async customerGetSports(req, res, next) {
    try {
      // pagination

      const { page, size, title, genreId, rating } = req.query;
      let where = {};

      if (title) {
        where.title = { [Op.iLike]: `%${title}%` };
      }
      if (genreId) {
        where.genreId = genreId;
      }
      if (rating) {
        where.rating = { [Op.gt]: rating };
      }

      if (page && size) {
        const { limit, offset } = getPagination(page, size);

        let sports = await Sport.findAndCountAll({
          where: where,
          limit,
          offset,
          order: [["id", "ASC"]],
        });

        if (!sports) {
          next({ name: "NotFound" });
        } else {
          const result = getPagingData(sports, page, limit);

          res.status(200).json({
            statusCode: 200,
            data: result,
          });
        }
      } else {
        let sports = await Sport.findAndCountAll({
          where: where,
          order: [["id", "ASC"]],
        });

        if (!sports) {
          next({ name: "NotFound" });
        } else {
          res.status(200).json({
            statusCode: 200,
            data: sports,
          });
        }
      }
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  static async getSport(req, res, next) {
    try {
      console.log(req.params);
      const { id } = req.params;
      let Sport = await Sport.findByPk(id);

      console.log(Sport);

      if (Sport === null) {
        next({ name: "NotFound" });
      } else {
        res.status(200).json({
          statusCode: 200,
          data: Sport,
        });
      }
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
  //sport by category body part
  static async customerGetSport(req, res, next) {
    try {
      console.log("MASUP");
      const id = req.params.id;
      let Sport = await Sport.findAll({
        where: { id: id },
        include: [User, Genre],
      });

      console.log(Sport);

      if (Sport.length === 0) {
        throw { name: "SportNotFound" };
      } else {
        res.status(200).json({
          statusCode: 200,
          data: Sport,
        });
      }
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  static async editSport(req, res, next) {
    try {
      const authorId = req.user.id;
      const {
        title,
        synopsis,
        trailerUrl,
        imgUrl,
        rating,
        genreId,

        status,
      } = req.body;
      const { id } = req.params;
      const updatedSport = await Sport.update(
        {
          title: title,
          synopsis: synopsis,
          trailerUrl: trailerUrl,
          imgUrl: imgUrl,
          rating: rating,
          genreId: genreId,
          authorId: authorId,
          status: status,
        },
        { where: { id: id } }
      );

      if (updatedSport <= 0) {
        next({ name: "NotFound" });
      } else {
        const createHistory = await History.create({
          SportId: id,
          title: title,
          description: `Sport with id ${id} updated`,
          updatedBy: authorId,
        });

        res.status(200).json({
          message: `Sport ${id} success to update`,
        });
      }
    } catch (err) {
      next(err);
    }
  }

  static async editSportStatus(req, res, next) {
    try {
      const { status } = req.body;
      const { id } = req.params;

      const beforeUpdatedSport = await Sport.findByPk(id);

      const statusBefore = beforeUpdatedSport.status;

      const updatedSport = await Sport.update(
        { status: status },
        { where: { id: id } }
      );

      if (updatedSport <= 0) {
        next({ name: "NotFound" });
      } else {
        await History.create({
          SportId: id,
          title: beforeUpdatedSport.title,
          description: `Sport with id ${id} status has been updated from ${statusBefore} to ${status}`,
          updatedBy: `${beforeUpdatedSport.authorId}`,
        });

        res.status(200).json({
          message: `Sport ${id} success to update`,
        });
      }
    } catch (err) {
      next(err);
    }
  }

  static async deleteSport(req, res, next) {
    try {
      const { id } = req.params;
      const deletedSport = await Sport.destroy({ where: { id: id } });

      if (deletedSport <= 0) {
        next({ name: "NotFound" });
      } else {
        res.status(200).json({
          message: `Sport ${id} success to delete`,
        });
      }
      // res.status(200).json({
      //   message: `Please change Sport's status instead of hard delete`,
      // })
    } catch (err) {
      next(err);
    }
  }
}

module.exports = SportController;
