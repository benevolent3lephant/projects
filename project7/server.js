const express = require('express');
// const morgan = require('morgan');
const bodyParser = require('body-parser');
const errorhandler = require('errorhandler');
const cors = require('cors');

const app = express();
const apiRouter = require('./api/api.js');
const PORT = process.env.PORT || 4000;

// app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cors());
app.use(errorhandler());

app.use('/api', apiRouter);

app.listen(PORT, () => {
  console.log('Listening on port: ' + PORT);
});

module.exports = app;
