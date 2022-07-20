const { userController } = require("../controllers/userController");
const authenticationCustomer = require("../middlewares/authenticationCustomer");
const historyController = require("../controllers/historyController");
const SportController = require("../controllers/sportController");
const authorization = require("../middlewares/authorization");
const authorizationAdmin = require("../middlewares/authorizationAdmin");
const { Movie, User, Genre, History } = require("../models");
const router = require("express").Router();

router.post("/register", userController.customerRegister);
router.post("/login", userController.customerLogin);
router.post("/google-sign-in", userController.customerGoogleSignIn);

router.get("/sports", SportController.customerGetSports);
router.get("/movies/:id", SportController.customerGetSport);

router.post(
  "/favorites/:movieId",
  authenticationCustomer,
  SportController.customerCreateTodo
);
router.get(
  "/favorites",
  authenticationCustomer,
  SportController.customerGetTodo
);

module.exports = router;
