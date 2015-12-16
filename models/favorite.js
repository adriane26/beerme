'use strict';
module.exports = function(sequelize, DataTypes) {
  var favorite = sequelize.define('favorite', {
    beerName: DataTypes.STRING,
    breweryName: DataTypes.STRING,
    beerId: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        models.favorite.hasMany(models.comment);
        models.favorite.hasMany(models.rating);
      }
    }
  });
  return favorite;
};