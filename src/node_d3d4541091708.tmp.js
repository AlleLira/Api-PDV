const express = require('express');
const rotes = require('./rotes');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());
app.use(rotes);

app.listen(process.env.PORT);