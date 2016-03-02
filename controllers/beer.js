var db = require('../models');
var express = require('express');
var request = require('request');
var router = express.Router();

router.get('/', function(req, res) {
  var query = req.query.q;
  // debugger
  if(!query){ 
    res.redirect('/beer/random?');
  } else {
    request(('http://api.brewerydb.com/v2/search?q='+query+'&withBreweries=Y&key='+process.env.API_KEY), function(err, response, body) {
      var data = JSON.parse(body);
      if (!err && response.statusCode === 200 && data.data[0].name) {
        res.render('beer/index', {beers: data,
                                  q: query});
      } 
      else {
        res.render('error');
      }
     });
    } 
});

////////// LOGIC FOR SHOW ONE BEER DESCRIPTION BELOW

router.get('/show/:id', function(req, res) {
  var searchQuery = req.query.q ? req.query.q : '';
  var id = req.params.id;
  request(('http://api.brewerydb.com/v2/beer/' + id+'?&withBreweries=Y&key='+process.env.API_KEY), function(err, response, body) {
    var data = JSON.parse(body);
    res.render('beer/show', {beer: JSON.parse(body),
                             q: searchQuery});
  });
});

///// BREWMASTER'S CHOICE: //////////
router.get('/random?', function(req, res) {
  var query = req.query.q;
  request(('http://api.brewerydb.com/v2/beer/random?&withBreweries=Y&key='+process.env.API_KEY), function(err, response, body) {
    var data = JSON.parse(body);
    // res.send(data);
    // console.log("this is the data.message for brewmaster's choice: " +data.message)
    if (data.message === "Request Successful") {
      res.render('beer/random', {beers: data, q: query});
    console.log(err);
    } else {
      res.render('error');
    }
  });
});

module.exports = router;
