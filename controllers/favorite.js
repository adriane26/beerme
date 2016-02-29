var express = require('express');
var db = require('../models');
var request = require('request');
var router = express.Router();



router.post('/', function(req, res) {
  db.favorite.findOrCreate({
    where: {
      beerId: req.body.beerId
      // userId: req.currentUser.id
    },
    defaults: {
      beerName: req.body.beerName,
     // breweryName: req.body.breweries[0].name 
     ////doesn't like how to find brewery name, hangs when i remove this part
     userId: req.currentUser.id
    }
  }).spread(function(favorite, created) {
    console.log("this is favorite.get" +favorite.get());
    console.log("created" +created);
    res.redirect('/favorites');
  });
});


router.get('/', function(req, res) {
  if (req.currentUser){
  db.favorite.findAll({
    where: {
      userId: req.currentUser.id
    }
    // order: 'beerName ASC' //// this will change to rating desc when I update
  }).then(function(favorites) {
    res.render('favorites/index', {favorites: favorites});
  });
  } else {
    req.flash('danger', 'You must be logged in to view your favorites');
    res.redirect('/');
  };
});

///////////// DELETE BUTTON.
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
