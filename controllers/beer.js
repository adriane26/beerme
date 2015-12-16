var express = require('express');
var request = require('request');
var router = express.Router();

router.get('/', function(req, res) {
  var query = req.query.q;
  // debugger
  request(('http://api.brewerydb.com/v2/search?q='+query+'&withBreweries=Y&key='+process.env.API_KEY), function(err, response, body) {
    var data = JSON.parse(body);
    console.log(data);
    if (!err && response.statusCode === 200 && data.data[0].name) {
      res.render('beers/index', {beers: data,
                            q: query});
      // console.log(beers);
      // console.log(data.Search);
    } else {
      res.render('error');
    }
  }); ////// if !query, render brewmaster's choice
});



router.get('/:imdbID', function(req, res) {
  // res.send(req.params.imdbID);
  var searchQuery = req.query.q ? req.query.q : '';
  var imdbID = req.params.imdbID;
  request('http://www.omdbapi.com/?i=' + imdbID, function(err, response, body) {
    res.render('movies/show', {movie: JSON.parse(body),
                             q: searchQuery});
  });
});


/////// BREWMASTER'S CHOICE: 

// router.get('/beers', function(req, res) {
//   var query = req.query.q;

//   request(('http://api.brewerydb.com/v2/beer/random?key='+process.env.API_KEY), function(err, response, body) {
//     var data = JSON.parse(body);
//     console.log(data);
//     console.log(process.env.API_KEY);
//     if (!err && response.statusCode === 200 && data.Search) {
//       res.render('beers', {beers: data.Search,
//                             q: query});
//     } else {
//       res.render('error');
//     }
//   });
// });

////////// LOGIC FOR SHOW ONE BEER DESCRIPTION BELOW



module.exports = router;
