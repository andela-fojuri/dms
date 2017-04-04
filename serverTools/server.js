const express = require('express');
const webpack = require('webpack');
const path = require('path');
const open = require('open');
const config = require('../webpack.config.dev');

require('dotenv').config();

const port = 4000;
const app = express();
const compiler = webpack(config);

const bodyParser = require('body-parser');
const logger = require('morgan');


app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));



app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
require('../server/app/routes/routes')(app);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/index.html'));
});

app.listen(port, (err) => {
  if (err) {
    console.log(err);
  } else if (process.env.NODE_ENV !== 'test') {
    open(`http://localhost:${port}`);
  }
});

module.exports = app;
