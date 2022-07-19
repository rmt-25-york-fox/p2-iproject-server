const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const Controller = require("./controllers");
const cors = require("cors");

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.post("/register", Controller.register);

app.listen(port, () => console.log("Successfully connected to port " + port));
