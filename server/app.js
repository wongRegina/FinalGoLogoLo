var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var graphqlHTTP = require('express-graphql');
var schema = require('./graphql/logoSchemas');
var cors = require("cors");
var passport = require('passport');
var session = require('express-session');

mongoose.connect('mongodb://localhost/node-graphql', { promiseLibrary: require('bluebird'), useNewUrlParser: true })
  .then(() =>  console.log('connection successful'))
  .catch((err) => console.error(err));

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var googleRouter = require('./routes/google')(passport);
var googleCallbackRouter = require('./routes/googleCallback')(passport);
var profileRouter = require('./routes/profile');
var googleLogoutRouter = require('./routes/googleLogout');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use(session({
  secret: 'secrettexthere',
  saveUninitialized: true,
  resave: true,
  // using store session on MongoDB using express-session + connect
}));
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);

  app.use('/auth/google', cors(), googleRouter);
  app.use('/auth/google/callback',cors(), googleCallbackRouter);
  app.use('/profile',cors(), profileRouter);
  app.use('/auth/google/logout',cors(), googleLogoutRouter);

  
app.use('*', cors());
app.use('/graphql', cors(), graphqlHTTP({
  schema: schema,
  rootValue: global,
  graphiql: true,
}));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
