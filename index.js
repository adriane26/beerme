var express = require('express');
var ejsLayouts = require('express-ejs-layouts');
var request = require('request');
var session   = require('express-session');
var bcrypt = require('bcrypt');
var bodyParser = require('body-parser');
var db = require('./models');
var flash = require('connect-flash');
var app = express();

app.set('view engine', 'ejs');
app.use(ejsLayouts);
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(flash());

/////// using SESSION
app.use(session({
  secret: 'so many secrets and beeeeers123',
  resave: false,
  saveUninitialized: true
}));

///// session
app.use(function(req,res,next){
  // req.session.user = 8;
  if(req.session.user){
    db.user.findById(req.session.user).then(function(user){
      req.currentUser = user;
      next();
    });
  }else{
    req.currentUser = false;
    next();
  }
});

app.use(function(req,res,next){
  res.locals.currentUser = req.currentUser;
  res.locals.alerts = req.flash();
  next();
});
///////// end session info

//// show me the home page
app.get('/', function(req, res) {
  res.render('home'); 
});

///show me the about page
app.get('/about', function(req, res){
  res.render('about');
});


///////////// good stuff
app.use('/beer', require('./controllers/beer'));
app.use('/favorites', require('./controllers/favorite'));
app.use('/auth', require('./controllers/auth.js'));
// app.use('/comment', require('./controllers/comment.js'));


//// error handling
app.get('/404', function(req, res, next){
  // res.render('error');
  next();
});

app.get('/403', function(req, res, next){
  // trigger a 403 error
  var err = new Error('The beer gods have denied you!');
  err.status = 403;
  next(err);
});

app.get('/500', function(req, res, next){
  // trigger a generic (500) error
  next(new Error('The server seems to be a little tipsy at the moment...'));
});

// Error handlers
app.use(function(req, res, next){
  res.status(404);
  // respond with html page
  if (req.accepts('html')) {
    res.render('error', { url: req.url });
    return;
  }
  // respond with json
  if (req.accepts('json')) {
    res.send({ error: 'Not found' });
    return;
  }
  // default to plain-text. send()
  res.type('txt').send('Not found');
});

app.listen(process.env.PORT || 3000);