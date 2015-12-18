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
      beerName: req.body.name,
     // breweryName: req.body.breweries[0].name 
     ////doesn't like how to find brewery name, hangs when i remove this part
     userId: req.currentUser.id
    }
  }).spread(function(favorite, created) {
    // console.log(favorite.get());
    res.redirect('/');
  });
});

router.get('/', function(req, res) {
  db.favorite.findAll({
    // order: 'beerName ASC' //// this will change to rating desc when I update
  }).then(function(favorites) {
    res.render('favorites/index', {favorites: favorites});
  });
});

///////////// DELETE BUTTON. SEE IF THERE'S A FAKE DESTROY/NOT PERMANENT

router.delete('/:beerId', function(req, res) {
  db.favorite.destroy({
    where: {
      beerId: req.params.beerId
    }
  }).then(function() {
    res.send({'msg': 'success'});
  }).catch(function(e) {
    res.send({'msg': 'error', 'error': e});
  });
});
 //// need to remove the div/well














module.exports = router;
