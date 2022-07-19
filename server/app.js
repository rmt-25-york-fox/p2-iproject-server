require("dotenv").config();

const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const Controller = require("./controllers");
const errorHandler = require("./middlewares/errorHandler");
const cors = require("cors");

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.post("/register", Controller.register);
app.post("/login", Controller.login);
app.get("/digimons", Controller.fetchDigimons);

app.use(errorHandler);
app.listen(port, () => console.log("Successfully connected to port " + port));
