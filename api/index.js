const express = require('express');
const path = require('path');
const favicon = require('serve-favicon'); // caches the icon in memory to improve performance
const logger = require('morgan'); 
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors'); //Cross origin resource sharing.

const routes = require('./routes/index');
const todos = require('./routes/todos');

const app = express();

// MongoDB
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/todo-api')
  .then(() =>  console.log('connection to MongoDB succesful'))
  .catch((err) => console.error(err));

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

//The Cross-Origin Resource Sharing (CORS) mechanism gives web servers
//cross-domain access controls, which enable secure cross-domain data transfers.
//Modern browsers use CORS in an API container - such as XMLHttpRequest or Fetch - 
//to mitigate risks of cross-origin HTTP requests.
app.use(cors()); 

app.use('/', routes);
app.use('/todos', todos);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json(`${err.status} : ${err.message}`);
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json(`${err.status} : ${err.message}`);

});


module.exports = app;
