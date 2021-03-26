const express = require('express');
const cors = require('cors');
const http = require("http");
require('dotenv').config({path: './.env'});

// Creates server
const app = express();

// body-parser
const bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// CORS
app.use(cors());

// Routes
app.use(require('./routes/index'));

// PORT
const PORT = process.env.PORT || 8443;

// Create server
http.createServer(app).listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  require ('./helpers/serverTools').pingDatabase();
});