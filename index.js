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

 app.get('/', function(req, res) {

  res.render('home');
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


app.use('/beers', require('./controllers/beer'));
app.use('/favorites', require('./controllers/favorite'));
app.use('/auth', require('./controllers/auth.js'));  ////first part is url string, second part is page rendered





app.listen(process.env.PORT || 3000);





