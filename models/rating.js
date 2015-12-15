'use strict';
module.exports = function(sequelize, DataTypes) {
  var rating = sequelize.define('rating', {
    favoriteID: DataTypes.INTEGER,
    score: DataTypes.FLOAT
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return rating;
};