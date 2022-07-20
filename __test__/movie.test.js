const request = require("supertest");
const app = require("../app");
const { signToken, verifyToken } = require("../helpers/jwt");
const dataUser = require("../data/users.json");
dataUser.forEach((el) => {
  el.createdAt = new Date();
  el.updatedAt = new Date();
});
const dataMovie = require("../data/sports.json");
dataMovie.forEach((el) => {
  el.createdAt = new Date();
  el.updatedAt = new Date();
});
const dataGenre = require("../data/genres.json");
dataGenre.forEach((el) => {
  el.createdAt = new Date();
  el.updatedAt = new Date();
});
const dataFavorite = require("../data/favorites.json");
dataFavorite.forEach((el) => {
  el.createdAt = new Date();
  el.updatedAt = new Date();
});

const {
  sequelize,
  Movie,
  User,
  History,
  Genre,
  Favorite,
} = require("../models");

const { queryInterface } = sequelize;
const user1 = {
  email: "HACKTIV8@gmail.com",
  password: "88888",
  role: "Customer",
};
const user2 = {
  email: "ADMINHACKTIV8@gmail.com",
  password: "88888",
  role: "Admin",
};
const user3 = {
  email: "STAFFHACKTIV8@gmail.com",
  password: "88888",
  role: "Staff",
};
let tokenUser1;
let tokenUser2;
let tokenUser3;

beforeAll(() => {
  return Favorite.destroy({
    where: {},
    restartIdentity: true,
    truncate: true,
    cascade: true,
  })
    .then(
      Movie.destroy({
        where: {},
        restartIdentity: true,
        truncate: true,
        cascade: true,
      })
    )
    .then(
      Genre.destroy({
        where: {},
        restartIdentity: true,
        truncate: true,
        cascade: true,
      })
    )
    .then(
      User.destroy({
        where: {},
        restartIdentity: true,
        truncate: true,
        cascade: true,
      })
    )
    .then(User.bulkCreate(dataUser, {}))
    .then(Genre.bulkCreate(dataGenre, {}))
    .then(Movie.bulkCreate(dataMovie, {}))
    .then(Favorite.bulkCreate(dataFavorite, {}))
    .then(() => {
      return User.create(user1);
    })
    .then((result) => {
      const payload = {
        id: result.id,
        email: result.email,
      };
      tokenUser1 = signToken(payload);
    })
    .then(() => {
      return User.create(user2);
    })
    .then((result) => {
      const payload = {
        id: result.id,
        email: result.email,
      };
      tokenUser2 = signToken(payload);
    })
    .then(() => {
      return User.create(user3);
    })
    .then((result) => {
      const payload = {
        id: result.id,
        email: result.email,
      };
      tokenUser3 = signToken(payload);
    });
});

afterAll((done) => {
  Favorite.destroy({
    where: {},
    restartIdentity: true,
    truncate: true,
    cascade: true,
  })
    .then(
      Movie.destroy({
        where: {},
        restartIdentity: true,
        truncate: true,
        cascade: true,
      })
    )
    .then(
      Genre.destroy({
        where: {},
        restartIdentity: true,
        truncate: true,
        cascade: true,
      })
    )
    .then(
      User.destroy({
        where: {},
        restartIdentity: true,
        truncate: true,
        cascade: true,
      })
    )
    .then(User.bulkCreate(dataUser, {}))
    .then(Genre.bulkCreate(dataGenre, {}))
    .then(Movie.bulkCreate(dataMovie, {}))
    .then(Favorite.bulkCreate(dataFavorite, {}))
    .then(done());
});

describe("POST /pub/register register", () => {
  describe("POST /pub/register fail test", () => {
    it("should be return an object with message E-mail is required! - caused by null", async () => {
      const payload = {
        password: "88888",
      };
      const res = await request(app).post("/pub/register").send(payload);

      expect(res.status).toBe(400);
      expect(res.body).toBeInstanceOf(Object);
      expect(res.body).toHaveProperty("message", expect.any(String));
      expect(res.body).toHaveProperty("message", "E-mail is required!");
    });

    it("should be return an object with message E-mail is required! - caused by empty string", async () => {
      const payload = {
        email: "",
        password: "88888",
      };
      const res = await request(app).post("/pub/register").send(payload);

      expect(res.status).toBe(400);
      expect(res.body).toBeInstanceOf(Object);
      expect(res.body).toHaveProperty("message", expect.any(String));
      expect(res.body).toHaveProperty("message", "E-mail is required!");
    });

    it("should be return an object with message Password is required! - caused by null", async () => {
      const payload = {
        email: "99aa9@gmail.com",
      };
      const res = await request(app).post("/pub/register").send(payload);

      expect(res.status).toBe(400);
      expect(res.body).toBeInstanceOf(Object);
      expect(res.body).toHaveProperty("message", expect.any(String));
      expect(res.body).toHaveProperty("message", "Password is required!");
    });

    it("should be return an object with message Password is required! - caused by empty string", async () => {
      const payload = {
        email: "99aa9@gmail.com",
        password: "",
      };
      const res = await request(app).post("/pub/register").send(payload);

      expect(res.status).toBe(400);
      expect(res.body).toBeInstanceOf(Object);
      expect(res.body).toHaveProperty("message", expect.any(String));
      expect(res.body).toHaveProperty("message", "Password is required!");
    });

    it("should be return an object with message E-mail address already in use!", async () => {
      const payload = {
        email: "888@gmail.com",
        password: "88888",
      };
      const res = await request(app).post("/pub/register").send(payload);

      expect(res.status).toBe(400);
      expect(res.body).toBeInstanceOf(Object);
      expect(res.body).toHaveProperty("message", expect.any(String));
      expect(res.body).toHaveProperty(
        "message",
        "E-mail address already in use!"
      );
    });

    it("should be return an object with message Invalid e-mail address!", async () => {
      const payload = {
        email: "888",
        password: "88888",
      };
      const res = await request(app).post("/pub/register").send(payload);

      expect(res.status).toBe(400);
      expect(res.body).toBeInstanceOf(Object);
      expect(res.body).toHaveProperty("message", expect.any(String));
      expect(res.body).toHaveProperty("message", "Invalid e-mail address!");
    });
  });

  describe("POST /pub/register success test", () => {
    it("should be return an object with status 201 - Created", async () => {
      const payload = {
        email: "LulusPhase2Amiin@gmail.com",
        password: "88888",
      };
      const res = await request(app).post("/pub/register").send(payload);

      expect(res.status).toBe(201);
      expect(res.body).toBeInstanceOf(Object);
      expect(res.body).toHaveProperty("id", expect.any(Number));
      expect(res.body).toHaveProperty("email", expect.any(String));
    });
  });
});

describe("POST /pub/login login", () => {
  describe("POST /pub/login fail test", () => {
    it("should be return an object with status 401 - Unauthorized - caused by email not in database", async () => {
      const payload = {
        email: "picolo@gmail.com",
        password: "88888",
      };
      const res = await request(app).post("/pub/login").send(payload);

      expect(res.status).toBe(401);
      expect(res.body).toBeInstanceOf(Object);
      expect(res.body).toHaveProperty("message", expect.any(String));
      expect(res.body).toHaveProperty("message", "Invalid email/password");
    });

    it("should be return an object with status 401 - Unauthorized - caused by wrong password", async () => {
      const payload = {
        email: "888@gmail.com",
        password: "88999",
      };
      const res = await request(app).post("/pub/login").send(payload);

      expect(res.status).toBe(401);
      expect(res.body).toBeInstanceOf(Object);
      expect(res.body).toHaveProperty("message", expect.any(String));
      expect(res.body).toHaveProperty("message", "Invalid email/password");
    });
  });

  describe("POST /pub/login success test", () => {
    it("should be return an object with status 200 - OK", async () => {
      const payload = {
        email: "888@gmail.com",
        password: "88888",
      };
      const res = await request(app).post("/pub/login").send(payload);

      expect(res.status).toBe(200);
      expect(res.body).toBeInstanceOf(Object);
      expect(res.body).toHaveProperty("access_token", expect.any(String));
      expect(res.body).toHaveProperty("name", expect.any(String));
      expect(res.body).toHaveProperty("role", expect.any(String));
    });
  });
});

describe("GET /pub/movies ", () => {
  describe("GET /pub/movies fail test", () => {
    it("should be return an object with status 404 - Not Found caused by movie id not valid - with access_token", async () => {
      const res = await request(app)
        .get("/pub/movies/300")
        .set("access_token", tokenUser1);

      expect(res.status).toBe(404);
      expect(res.body).toBeInstanceOf(Object);
      expect(res.body).toHaveProperty("message", expect.any(String));
      expect(res.body).toHaveProperty("message", "Movie not found");
    });

    it("should be return an object with status 404 - Not Found caused by movie id not valid - without access_token", async () => {
      const res = await request(app)
        .get("/pub/movies/300")
        .set("access_token", null);

      expect(res.status).toBe(404);
      expect(res.body).toBeInstanceOf(Object);
      expect(res.body).toHaveProperty("message", expect.any(String));
      expect(res.body).toHaveProperty("message", "Movie not found");
    });
  });

  describe("GET /pub/movies success test", () => {
    it("should be return an object with status 200 - OK - with access_token for movies without query", async () => {
      const payload = {
        access_token:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiI4ODhAZ21haWwuY29tIiwiaWF0IjoxNjU3NzEzNzk4fQ.n43UG46gnUzPBbiZKkKIVbxM2RDb8elgnp8Di87m4hk@gmail.com",
      };
      const res = await request(app)
        .get("/pub/movies")
        .set("access_token", tokenUser1);

      expect(res.status).toBe(200);
      expect(res.body).toBeInstanceOf(Object);
      expect(res.body).toHaveProperty("statusCode", expect.any(Number));
      expect(res.body).toHaveProperty("data.rows", expect.any(Array));
    });

    it("should be return an object with status 200 - OK - without access_token for movies without query", async () => {
      const payload = {};
      const res = await request(app)
        .get("/pub/movies")
        .set("access_token", null);

      expect(res.status).toBe(200);
      expect(res.body).toBeInstanceOf(Object);
      expect(res.body).toHaveProperty("statusCode", expect.any(Number));
      expect(res.body).toHaveProperty("data.rows", expect.any(Array));
    });

    it("should be return an object with status 200 - OK - with access_token with filter rating", async () => {
      const payload = {
        access_token:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiI4ODhAZ21haWwuY29tIiwiaWF0IjoxNjU3NzEzNzk4fQ.n43UG46gnUzPBbiZKkKIVbxM2RDb8elgnp8Di87m4hk@gmail.com",
      };
      const res = await request(app).get("/pub/movies?rating=8").send(payload);

      expect(res.status).toBe(200);
      expect(res.body).toBeInstanceOf(Object);
      expect(res.body).toHaveProperty("statusCode", expect.any(Number));
      expect(res.body).toHaveProperty("data", expect.any(Object));
    });

    it("should be return an object with status 200 - OK - without access_token with filter rating", async () => {
      const payload = {};
      const res = await request(app).get("/pub/movies?rating=8").send(payload);

      expect(res.status).toBe(200);
      expect(res.body).toBeInstanceOf(Object);
      expect(res.body).toHaveProperty("statusCode", expect.any(Number));
      expect(res.body).toHaveProperty("data", expect.any(Object));
    });

    it("should be return an object with status 200 - OK - with access_token with filter genreId", async () => {
      const payload = {
        access_token:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiI4ODhAZ21haWwuY29tIiwiaWF0IjoxNjU3NzEzNzk4fQ.n43UG46gnUzPBbiZKkKIVbxM2RDb8elgnp8Di87m4hk@gmail.com",
      };
      const res = await request(app).get("/pub/movies?genreId=8").send(payload);

      expect(res.status).toBe(200);
      expect(res.body).toBeInstanceOf(Object);
      expect(res.body).toHaveProperty("statusCode", expect.any(Number));
      expect(res.body).toHaveProperty("data", expect.any(Object));
    });

    it("should be return an object with status 200 - OK - without access_token with filter genreId", async () => {
      const payload = {};
      const res = await request(app).get("/pub/movies?genreId=8").send(payload);

      expect(res.status).toBe(200);
      expect(res.body).toBeInstanceOf(Object);
      expect(res.body).toHaveProperty("statusCode", expect.any(Number));
      expect(res.body).toHaveProperty("data", expect.any(Object));
    });

    it("should be return an object with status 200 - OK - with access_token with search by title", async () => {
      const payload = {
        access_token:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiI4ODhAZ21haWwuY29tIiwiaWF0IjoxNjU3NzEzNzk4fQ.n43UG46gnUzPBbiZKkKIVbxM2RDb8elgnp8Di87m4hk@gmail.com",
      };
      const res = await request(app)
        .get("/pub/movies?title=stan")
        .send(payload);

      expect(res.status).toBe(200);
      expect(res.body).toBeInstanceOf(Object);
      expect(res.body).toHaveProperty("statusCode", expect.any(Number));
      expect(res.body).toHaveProperty("data", expect.any(Object));
    });

    it("should be return an object with status 200 - OK - without access_token with search by title", async () => {
      const payload = {};
      const res = await request(app)
        .get("/pub/movies?title=stan")
        .send(payload);

      expect(res.status).toBe(200);
      expect(res.body).toBeInstanceOf(Object);
      expect(res.body).toHaveProperty("statusCode", expect.any(Number));
      expect(res.body).toHaveProperty("data", expect.any(Object));
    });

    it("should be return an object with status 200 - OK - with access_token pagination", async () => {
      const payload = {
        access_token:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiI4ODhAZ21haWwuY29tIiwiaWF0IjoxNjU3NzEzNzk4fQ.n43UG46gnUzPBbiZKkKIVbxM2RDb8elgnp8Di87m4hk@gmail.com",
      };
      const res = await request(app)
        .get("/pub/movies?page=0&size=9")
        .send(payload);

      expect(res.status).toBe(200);
      expect(res.body).toBeInstanceOf(Object);
      expect(res.body).toHaveProperty("statusCode", expect.any(Number));
      expect(res.body).toHaveProperty("data", expect.any(Object));
      expect(res.body.data).toHaveProperty("movies", expect.any(Array));
      expect(res.body.data.movies.length).toBe(9);
    });

    it("should be return an object with status 200 - OK - without access_token pagination", async () => {
      const payload = {};
      const res = await request(app)
        .get("/pub/movies?page=0&size=9")
        .send(payload);

      expect(res.status).toBe(200);
      expect(res.body).toBeInstanceOf(Object);
      expect(res.body).toHaveProperty("statusCode", expect.any(Number));
      expect(res.body).toHaveProperty("data", expect.any(Object));
      expect(res.body.data).toHaveProperty("movies", expect.any(Array));
      expect(res.body.data.movies.length).toBe(9);
    });

    it("should be return an object with status 200 - OK - with access_token movie details  by id", async () => {
      const payload = {
        access_token:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiI4ODhAZ21haWwuY29tIiwiaWF0IjoxNjU3NzEzNzk4fQ.n43UG46gnUzPBbiZKkKIVbxM2RDb8elgnp8Di87m4hk@gmail.com",
      };
      const res = await request(app).get("/pub/movies/1").send(payload);

      expect(res.status).toBe(200);
      expect(res.body).toBeInstanceOf(Object);
      expect(res.body).toHaveProperty("statusCode", expect.any(Number));
      expect(res.body).toHaveProperty("data", expect.any(Object));
      expect(res.body.data[0]).toHaveProperty("id", expect.any(Number));
      expect(res.body.data[0].id).toBe(1);
    });

    it("should be return an object with status 200 - OK - without access_token movie details  by id", async () => {
      const payload = {};
      const res = await request(app).get("/pub/movies/1").send(payload);

      expect(res.status).toBe(200);
      expect(res.body).toBeInstanceOf(Object);
      expect(res.body).toHaveProperty("statusCode", expect.any(Number));
      expect(res.body).toHaveProperty("data", expect.any(Object));
      expect(res.body.data[0]).toHaveProperty("id", expect.any(Number));
      expect(res.body.data[0].id).toBe(1);
    });
  });
});

describe("GET /pub/favorites ", () => {
  describe("GET /pub/favorites fail test", () => {
    it("should be return an object with status 401 - Unauthorized caused by not yet log in", async () => {
      const payload = {};
      const res = await request(app)
        .get("/pub/favorites")
        .set("access_token", null);

      expect(res.status).toBe(401);
      expect(res.body).toBeInstanceOf(Object);
      expect(res.body).toHaveProperty("message", expect.any(String));
      expect(res.body).toHaveProperty("message", "Invalid token");
    });

    it("should be return an object with status 401 - Unauthorized caused by role is not Customer but Admin", async () => {
      const payload = {};
      const res = await request(app)
        .get("/pub/favorites")
        .set("access_token", tokenUser2);

      expect(res.status).toBe(401);
      expect(res.body).toBeInstanceOf(Object);
      expect(res.body).toHaveProperty("message", expect.any(String));
      expect(res.body).toHaveProperty("message", "Invalid email/password");
    });

    it("should be return an object with status 401 - Unauthorized caused by role is not Customer but Staff", async () => {
      const payload = {};
      const res = await request(app)
        .get("/pub/favorites")
        .set("access_token", tokenUser3);

      expect(res.status).toBe(401);
      expect(res.body).toBeInstanceOf(Object);
      expect(res.body).toHaveProperty("message", expect.any(String));
      expect(res.body).toHaveProperty("message", "Invalid email/password");
    });
  });

  describe("GET /pub/favorites success test", () => {
    it("should be return an object with status 200 - OK", async () => {
      const payload = {
        email: "888@gmail.com",
        password: "88888",
      };
      const res = await request(app).post("/pub/login").send(payload);

      const response = await request(app)
        .get("/pub/favorites")
        .set("access_token", res.body.access_token);

      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toHaveProperty("data", expect.any(Array));
      expect(response.body.data[0]).toHaveProperty("id", expect.any(Number));
      expect(response.body.data[0]).toHaveProperty(
        "movieId",
        expect.any(Number)
      );
      expect(response.body.data[0]).toHaveProperty(
        "authorId",
        expect.any(Number)
      );
    });
  });
});

describe("POST /pub/favorites ", () => {
  describe("POST /pub/favorites success test", () => {
    it("should be return an object with status 201 - Created Added a movie to favorites", async () => {
      const res = await request(app)
        .post("/pub/favorites/1")
        .set("access_token", tokenUser1);

      expect(res.status).toBe(201);
      expect(res.body).toBeInstanceOf(Object);
      expect(res.body).toHaveProperty("message", expect.any(String));
    });
  });

  describe("POST /pub/favorites fail test", () => {
    it("should be return an object with a message Movie not found", async () => {
      const res = await request(app)
        .post("/pub/favorites/400")
        .set("access_token", tokenUser1);

      expect(res.status).toBe(404);
      expect(res.body).toBeInstanceOf(Object);
      expect(res.body).toHaveProperty("message", expect.any(String));
      expect(res.body).toHaveProperty("message", "Movie not found");
    });
  });
});
