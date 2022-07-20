require('dotenv').config();

const cors = require('cors');
const express = require('express');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.listen(PORT, () => { console.log(`Server is listening to PORT: ${PORT}`) });

module.exports = app;