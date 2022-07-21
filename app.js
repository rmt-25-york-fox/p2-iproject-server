const cors = require("cors");
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const errHandler = require("./middleware/errHandler");

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(require("./routes"));
app.use(errHandler);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
