if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const cors = require("cors");
let express = require("express");
let app = express();
const port = process.env.PORT || 3000;
const errorHandler = require("./middlewares/errorHandler");
const routes = require("./routes");

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(routes);
app.use(errorHandler);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
