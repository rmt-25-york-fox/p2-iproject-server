const routes = require("express").Router();
const UserController = require("../controllers/userController");
const errorHandler = require("../middlewares/errorhandler");
const authentication = require("../middlewares/authentication");

routes.post("/register", UserController.register);
routes.post("/login", UserController.login);

routes.use(authentication);

// routes.post("/upload")

routes.use(errorHandler);
