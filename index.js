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
app.use(express.static(__dirname + '/static'));
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



///////////// good stuff
app.use('/beer', require('./controllers/beer'));
app.use('/favorites', require('./controllers/favorite'));
app.use('/auth', require('./controllers/auth.js'));  ////first part is url string, second part is page rendered



app.listen(process.env.PORT || 3000);





