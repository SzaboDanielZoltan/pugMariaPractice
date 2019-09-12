const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser');
const UserService = require('./module/user');

const indexRouter = require('./routes/index');
const loginRouter = require('./routes/login');
const productsRouter = require('./routes/products');
const aboutRouter = require('./routes/about');
const contactRouter = require('./routes/contact');

const app = express();
const us = new UserService();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(async (req, res, next) => {
  const uuid = req.cookies.uuid;
  const tokens = await us.getAllToken();
  const filter = tokens.filter(token => token.token == uuid);
  if (filter.length == 0) {
    req.validToken = false;
  } else {
    req.validToken = true;
  }
  next();
});

app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use('/products', productsRouter);
app.use('/about', aboutRouter);
app.use('/contact', contactRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);

  // Ez amúgy: res.render('error');
  res.render('login');
});

module.exports = app;
