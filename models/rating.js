'use strict';
module.exports = function(sequelize, DataTypes) {
  var rating = sequelize.define('rating', {
    favoriteID: DataTypes.INTEGER,
    score: DataTypes.FLOAT
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        models.rating.belongsTo(models.favorite);

        // IF YOU CREATE A FAVORITE AND LATER WANT TO ADD A rating: 

            // db.favorite.findOne().then(function(favorite) {
  //associate previously loaded post instance
      // favorite.addRating(rating);
// });
      }
    }
  });
  return rating;
};