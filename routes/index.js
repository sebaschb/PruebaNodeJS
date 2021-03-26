const express = require('express');
const app = express();

app.use(require('../middleware/mainMiddleware'));

module.exports = app;