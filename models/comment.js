'use strict';
module.exports = function(sequelize, DataTypes) {
  var comment = sequelize.define('comment', {
    favoriteID: DataTypes.INTEGER,
    body: DataTypes.TEXT
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        models.comment.belongsTo(models.favorite);
        
        // IF YOU CREATE A FAVORITE AND LATER WANT TO ADD A COMMENT: 

            // db.favorite.findOne().then(function(favorite) {
  //associate previously loaded post instance
      // favorite.addComment(comment);
// });
      }
    }
  });
  return comment;
};