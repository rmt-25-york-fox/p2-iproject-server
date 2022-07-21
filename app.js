"use strict";

require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const cors = require("cors");

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/", require("./routes/index"));

app.listen(port, () => {
  console.log(`app is running on port ${port}`);
});
