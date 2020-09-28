const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

// middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// api routes
app.use('/users', require('./controller/user.controller'));

// server
const PORT = process.env.NODE_ENV === 'production' ? 80 : process.env.DEV_PORT;
app.listen(PORT, () => console.log("Backend server live on " + PORT));