var express = require('express');
var nodemailer = require("nodemailer");
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var multer = require('multer');

var db = require('./app/db');
var auth = require('./app/modules/auth/config/passport');
var routesApi = require('./app/modules/auth/routes/auth_routes');
var routesHome = require('./app/modules/home/routes/home_routes');
var routesSidemenu = require('./app/modules/sidemenu/routes/sidemenu_routes');
var routesFeed = require('./app/modules/feed/routes/feedRoutes');

    
//var index = require('./routes/index');
//var users = require('./routes/users');

var app = express();

// view engine setup
//app.set('views', path.join(__dirname, 'public'));
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(function(req, res, next) { //If you do not allow this, you will trigger a CORS (Cross Origin Request Sharing) error in the web browser.
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, OPTIONS, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization, Accept');
    next();
});

//app.use('/', index);
//app.use('/users', users);

//Initializing the Passport just before the /api routes
app.use(passport.initialize());
app.use('/api', routesApi);

app.use('/home', routesHome);

app.use('/sidemenu', routesSidemenu);

app.use('/upload', routesFeed);

//app.use('/', express.static(path.join(__dirname, 'public'), { redirect: false }));

/*app.use('/*', function(req, res, next) {
            res.sendfile('./public/index.html'); // load our public/index.html file
            next();
        });*/

// route to handle all angular requests
// rewrite virtual urls to angular app to enable refreshing of internal pages
        app.get('*', function(req, res) {
            res.sendfile('./public/index.html'); // load our public/index.html file
        });

        

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {

  if (err.name === 'UnauthorizedError') {
    res.status(401);
    res.json({"message" : err.name + ": " + err.message});
  }
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
