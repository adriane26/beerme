var express = require('express');
var db = require('../models');
var request = require('request');
var router = express.Router();



router.post('/', function(req, res) {
  db.favorite.findOrCreate({
    where: {
      beerId: req.body.id
    },
    defaults: {
      beerName: req.body.name
     // breweryName: req.body.data.breweries.name ////doesn't like how to find brewery name, hangs when i remove this part
    }
  }).spread(function(favorite, created) {
    console.log(favorite.get());
    res.redirect('/');
  });
});

router.get('/', function(req, res) {
  db.favorite.findAll({
    order: 'beerName ASC' //// this will change to rating desc when I update
  }).then(function(favorites) {
    res.render('favorites/index', {favorites: favorites});
  });
});

///////////// DELETE BUTTON. SEE IF THERE'S A FAKE DESTROY/NOT PERMANENT

// router.delete('/:imdbID', function(req, res) {
//   db.favorite.destroy({
//     where: {
//       imdbID: req.params.imdbID
//     }
//   }).then(function() {
//     res.send({'msg': 'success'});
//   }).catch(function(e) {
//     res.send({'msg': 'error', 'error': e});
//   });
// });















module.exports = router;
