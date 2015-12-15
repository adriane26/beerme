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

app.use(session({
	secret: 'sdfweoijfesllllsfbeers',  //phrase, nonsense, etc.
	resave : false,
	saveUninitialized: true
}));



//// custom session middleware
app.use(function(req,res, next){
	if(req.session.user) {
		db.user.findById(req.session.user).then(function(user) {
			///this will get run every route
			req.currentUser = user;
			next();
		});
	} else {
		req.currentUser = false;
		next();
	}
});



app.use(function(req,res, next){
	///locals allows us to use currentuser in our templates
	res.locals.currentUser = req.currentUser;
	res.locals.alerts = req.flash(); 
	next();
});



	req.session.lastPage = req.header('Referer');   ///NOTE SPELLING OF REFERER: WRONG IS 		RIGHT!
	res.locals.lastPage = req.session.lastPage;
	//// makes the last page universal no matter the route
	next(); /// next continues execution of our route
});


 app.get('/', function(req, res) {

  res.render('index');
   });


// app.post('/login', function(req,res){
// 	var password = req.body.password;
// 	var newPassword;
// 	bcrypt.hash(password, 3, function(err, hash){
// 		newPassword = hash;

// 		bcrypt.compare(password, newPassword,function(err, res){
// 			if (res === true){
// 				res.render(//whatever page
// 					);
// 			} else {
// 					res.redirect('/login'); //write error response, please try again, etc.
// 			}
// 		});
// 	});
// 		// db.create();
// })


app.use('/beer', require('./controllers/beer'));
app.use('/favorites', require('./controllers/favorite'));
app.use('/auth', require('./controllers/auth.js'));  ////first part is url string, second part is page rendered

var port = 3000;
app.listen(port, function() {
  console.log("You're listening to the smooth sounds of port " + port);
});









