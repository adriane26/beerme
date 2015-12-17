var db = require('../models');
var express = require('express');
var request = require('request');
var router = express.Router();

router.get('/', function(req, res) {
  var query = req.query.q;
  // debugger
  if(!query){ 
    res.redirect('/beers/show/random');
  } else {
    request(('http://api.brewerydb.com/v2/search?q='+query+'&withBreweries=Y&key='+process.env.API_KEY), function(err, response, body) {
      var data = JSON.parse(body);
      // console.log(data);
      if (!err && response.statusCode === 200 && data.data[0].name) {
        res.render('beers/index', {beers: data,
                              q: query});
        // console.log(beers);
        // console.log(data.Search);
       } 
       // else if (query == '') {
      //   ////// if !query, render brewmaster's choice
      //   request(('http://api.brewerydb.com/v2/beer/random?key='+process.env.API_KEY),
      //     function(err, response, body){
      //       // var data = JSON.parse(body);
      //     res.render('beers/index', {beers:data});
      //      });

      // } 
      else {
        res.render('error');
      }
      
     });
    } 
});

////////// LOGIC FOR SHOW ONE BEER DESCRIPTION BELOW
//////work on this!  
router.get('/show/:id', function(req, res) {
  // res.send(req.params.imdbID);
  var searchQuery = req.query.q ? req.query.q : '';
  var id = req.params.id;
  request(('http://api.brewerydb.com/v2/beer/' + id+'?&withBreweries=Y&key='+process.env.API_KEY), function(err, response, body) {
    var data = JSON.parse(body);
    console.log(data);
    res.render('beers/show/', {beer: JSON.parse(body),
                             q: searchQuery});
    console.log(searchQuery);
  });
});



///// BREWMASTER'S CHOICE: how is this linked to the button?  SHOULD THE "SUBMIT" QUERY BE 'random?key=' ? DO I NEED A NEW PAGE? 

router.get('/show/random', function(req, res) {
  var query = req.query.q;

  request(('http://api.brewerydb.com/v2/beer/random?key='+process.env.API_KEY), function(err, response, body) {
    var data = JSON.parse(body);
    console.log(data);
    if (!err && response.statusCode === 200 && data.data[0].name) {
      res.render('beers', {beers: data,
                            q: query});
    } else {
      res.render('error');
    }
  });
});





module.exports = router;
