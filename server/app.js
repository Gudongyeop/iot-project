var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');
var studentsRouter = require('./routes/students');
var tokenRouter = require('./routes/token');
var coronaRouter = require('./routes/coronaboard');
var temperatureRouter = require('./routes/temperature');
var getCoronaNewsRouter = require('./routes/searchCoronaNews');
var statisticsTempRouter = require('./routes/statisticsTemp');
var mattermostRouter =require('./routes/mattermost');

var app2 = express(); // 소켓통신을 위한 
var http = require('http').createServer(app2);
//var io = require('socket.io')(http, {
  //pingTimeout: 1000
//});

//require('./libs/socketConnection')(io);

//http.listen(3001, () => {
  //console.log('listening on *:3001');
//});

var app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', indexRouter);
app.use('/api/students', studentsRouter);
app.use('/api/signin', tokenRouter);
app.use('/api/corona',coronaRouter);
app.use('/api/temp', temperatureRouter);
app.use('/api/news', getCoronaNewsRouter);
app.use('/api/statistics', statisticsTempRouter);
app.use('/api/matter', mattermostRouter);


app.listen(3000);
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
