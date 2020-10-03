const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const errorHandler = require('./_helpers/error-handler');
require('dotenv').config();

const app = express();

// middleware
app.use(cors({ credentials: true, origin: process.env.WEBUI_URL }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// api routes
app.use('/users', require('./controller/user.controller'));

// global error handler
app.use(errorHandler);

// server
const PORT = process.env.NODE_ENV === 'production' ? 80 : process.env.DEV_PORT;
app.listen(PORT, () => console.log("Backend server live on " + PORT));