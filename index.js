require("dotenv").config();
const express = require("express");
const app = express();
var cors = require("cors");
const Controller = require("./controllers/controllers");
const errorHandler = require("./middlewares/errorHandler");
const port = 10000;
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());
app.post("/register", Controller.Register);
app.post("/login", Controller.Login);
app.get("/listProducts", Controller.getAll);
app.get("/listProducts/:id", Controller.selectDetailProduct);
app.use(errorHandler);
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
