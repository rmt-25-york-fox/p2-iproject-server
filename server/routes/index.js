const routes = require("express").Router();
const UserController = require("../controllers/userController");
const errorHandler = require("../middlewares/errorhandler");
const authentication = require("../middlewares/authentication");
const ProfileController = require("../controllers/profileController");
const upload = require("../helpers/multer");

routes.post("/register", UserController.register);
routes.post("/login", UserController.login);

routes.post(
  "/profile/upload",
  upload.single("files"),
  ProfileController.uploadImage
);
routes.use(authentication);

routes.use(errorHandler);

module.exports = routes;
