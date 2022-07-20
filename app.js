if(process.env.NODE_ENV !== 'production')
  require('dotenv').config();

const cors = require('cors');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const routes = require('./routes');
const errorHandler = require('./middlewares/errorHandler');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(routes);
app.use(errorHandler);

app.listen(PORT, () => { console.log(`Server is listening to PORT: ${PORT}`) });

module.exports = app;