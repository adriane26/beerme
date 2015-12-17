var express = require('express');
var ejsLayouts = require('express-ejs-layouts');
var request = require('request');
var session   = require('express-session');
var bcrypt = require('bcrypt');
var bodyParser = require('body-parser');
var db = ('./models');
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


app.get('/', function(req, res) {
  res.render('home'); 
});


////// I THINK I SHOULD PUT THIS ON THE AUTH CONTROLLER ... /////  
app.post('/auth/login', function(req,res){
	var password = req.body.password;
	var newPassword;
	bcrypt.hash(password, 10, function(err, hash){
		newPassword = hash;

		bcrypt.compare(password, newPassword,function(err, resp){
			if (resp === true){
				resp.render('home');
			} else {
					resp.redirect('/login'); //write error response, please try again, etc.
			}
		});
	});
		 // db.create();   /// says this is not a function
});

//////// need help with above saying res.render is not a function



///////////// good stuff
app.use('/beers', require('./controllers/beer'));
app.use('/favorites', require('./controllers/favorite'));
app.use('/auth', require('./controllers/auth.js'));  ////first part is url string, second part is page rendered



app.listen(process.env.PORT || 3000);





