const express = require('express');
const path = require('path');

require('dotenv').config();

const port = process.env.PORT || 4000;
const app = express();

const bodyParser = require('body-parser');
const logger = require('morgan');


app.use(express.static(path.join(__dirname, '/')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
require('./server/app/routes/routes')(app);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './index.html'));
});

app.listen(port, (err) => {
  if (err) {
    console.log(err);
  }
  console.log('server started');
});

module.exports = app;
